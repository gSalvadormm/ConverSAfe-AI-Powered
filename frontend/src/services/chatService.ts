// src/services/chatService.ts

import { apiClient } from "@/utils/apiClient";

export interface Mensaje {
  roomId: string;
  sender: {
    _id: string;
    name: string;
    role: "admin" | "user";
    imagen?: string;
  };
  content: string;
  hora: string;
}

// Obtener mensajes de una sala
export const getMessages = (roomId: string): Mensaje[] => {
  const all = JSON.parse(localStorage.getItem("mensajes") || "[]");
  return all.filter((m: Mensaje) => m.roomId === roomId);
};

// Enviar mensaje (simulado)
export const sendMessage = (roomId: string, content: string, sender: Mensaje["sender"]) => {
  const nuevoMensaje: Mensaje = {
    roomId,
    sender,
    content,
    hora: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const all = JSON.parse(localStorage.getItem("mensajes") || "[]");
  all.push(nuevoMensaje);
  localStorage.setItem("mensajes", JSON.stringify(all));
};

// Suscripción simulada con polling cada X milisegundos
let intervalId: number;

export const subscribeToMessages = (
  roomId: string,
  callback: (messages: Mensaje[]) => void,
  delay = 1000
) => {
  clearInterval(intervalId);
  intervalId = window.setInterval(() => {
    const mensajes = getMessages(roomId);
    callback(mensajes);
  }, delay);
};

export const unsubscribeFromMessages = () => {
  clearInterval(intervalId);
};

export const crearChatRoom = async (name: string) => {
  return apiClient("/chatrooms", {
    method: "POST",
    body: { name },
    auth: true,
  });
};
