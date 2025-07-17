import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";

interface Usuario {
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

interface Mensaje {
  contenido: string;
  autor: string;
  hora: string;
  imagen?: string;
  rol: "Administrador" | "Usuario";
}

interface ChatroomResponse {
  id: string;
  name: string;
  creador: string;
  creadorEmail: string;
  adminId: string;
}

export const useChatroomData = (roomId: string) => {
  const [room, setRoom] = useState<ChatroomResponse | null>(null);
  const [participants, setParticipants] = useState<Usuario[]>([]);
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await apiClient(`/chatrooms/${roomId}`, { auth: true });

        setRoom({
          id: data._id,
          name: data.name,
          creador: data.admin.name,
          creadorEmail: data.admin.email,
          adminId: data.admin._id,
        });

        const allParticipants: Usuario[] = data.participants.map((p: any) => ({
          name: p.name,
          email: p.email,
          role: p._id === data.admin._id ? "admin" : "user",
          avatar: p._id === data.admin._id ? "/admin.png" : "/usuario1.png",
        }));

        setParticipants(allParticipants);

        const msgs: Mensaje[] = data.messages.map((m: any) => ({
          contenido: m.content,
          autor: m.sender.name,
          hora: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          imagen: m.sender._id === data.admin._id ? "/admin.png" : "/usuario1.png",
          rol: m.sender._id === data.admin._id ? "Administrador" : "Usuario",
        }));

        setMessages(msgs);

      } catch (e) {
        setError("Error al obtener la sala.");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) fetchData();
  }, [roomId]);

  return {
    room,
    participants: participants.map((p) => ({
      nombre: p.name,
      rol: p.role === "admin" ? "Administrador" : "Usuario",
      imagen: p.avatar,
    })),
    messages: messages.map((msg) => ({
      ...msg,
    })),
    loading,
    error,
  };
};
