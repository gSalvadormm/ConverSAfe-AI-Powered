import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import passport from "passport";
import { Server } from "socket.io";
import { connectDB } from "./src/config/db.config.js";
import { initializePassport } from "./src/config/passport.config.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import wsAuthMiddleware from "./src/middlewares/wsAuthMiddleware.js";
import authRouter from "./src/routes/authRoutes.js";
import chatRoomRouter from "./src/routes/chatRoomRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import registerChatSocket from "./src/sockets/chatSocket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "http://frontend:5173"];

const app = express();
const httpServer = createServer(app);

// WebSocket Config
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Socket.IO CORS: Origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Mongo Connection
connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: Origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/chatrooms", chatRoomRouter);

io.use(wsAuthMiddleware);
// WebSocket Connection
io.on("connection", socket => {
  console.log(`User authenticated: ${socket.user.name}`);
  registerChatSocket(io, socket);
});

app.use(errorMiddleware);

// HTTP Connection
httpServer.listen(PORT, () => {
  console.log(`Running server on ${HOST}:${PORT}`);
});
