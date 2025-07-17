# Frontend (React + Vite)

Este frontend está construido con React, Vite y TypeScript.

## 🚀 Desarrollo con Compose

La forma recomendada de trabajar es levantar los servicios de backend y data con Docker Compose, y ejecutar el frontend en modo desarrollo local para aprovechar el hot reload.

### 1. Levanta los servicios auxiliares con Compose

Desde la raíz del proyecto, ejecuta:

```bash
docker compose -f compose.backend.yml -f compose.data.yml up
```

Esto levantará el backend (Node.js), la base de datos MongoDB y el servicio de análisis (data/FastAPI) en contenedores.

### 2. Ejecuta el frontend en local

En otra terminal:

```bash
cd frontend
npm install
VITE_API_URL=http://localhost:3000 \
VITE_SOCKET_URL=http://localhost:3000 npm run dev
```

El frontend estará disponible en [http://localhost:5173](http://localhost:5173) y se conectará al backend levantado por Compose.

## ⚙️ Variables de entorno

- `VITE_API_URL`: URL base del backend (por ejemplo, `http://localhost:3000`)
- `VITE_SOCKET_URL`: URL para el WebSocket. Debe coincidir con el backend (`http://localhost:3000` en desarrollo).

## 📝 Notas

- Puedes personalizar el archivo Compose para tu flujo de trabajo.
- Si quieres levantar todo el stack en contenedores, usa `compose.full.yml`.
