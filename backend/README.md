# Backend (Node.js + Express)

Este backend está construido con Node.js, Express y MongoDB.

## 🚀 Desarrollo con Compose

La forma recomendada de trabajar es levantar MongoDB y el servicio de análisis (data) con Docker Compose, y ejecutar el backend en modo desarrollo local para aprovechar el hot reload.

### 1. Levanta los servicios auxiliares con Compose

Desde la raíz del proyecto, ejecuta:

```bash
docker compose -f compose.data.yml up -d
docker compose -f compose.backend.yml up mongo
```

Esto levantará MongoDB y el servicio de análisis (data/FastAPI) en contenedores.

### 2. Ejecuta el backend en local

En otra terminal:

```bash
cd backend
npm install
MONGO_URI=mongodb://localhost:27017/conversafe 
AI_URL=http://localhost:8000 
JWT_SECRET=supersecreto npm run dev
```

El backend estará disponible en [http://localhost:3000](http://localhost:3000) y se conectará a los servicios levantados por Compose.

## ⚙️ Variables de entorno

- `PORT`: Puerto del backend (por defecto 3000)
- `HOST`: Host del backend
- `CORS_ALLOWED_ORIGINS`: Orígenes permitidos para CORS, separados por coma. Por defecto `http://localhost:5173,http://frontend:5173`
- `MONGO_URI`: Cadena de conexión a MongoDB
- `AI_URL`: URL del servicio de análisis (data)
- `JWT_SECRET`: Clave secreta para JWT

## 📝 Notas

- Puedes personalizar el archivo Compose para tu flujo de trabajo.
- Si quieres levantar todo el stack en contenedores, usa `compose.full.yml`. 