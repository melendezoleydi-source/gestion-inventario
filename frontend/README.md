# Gestión de Inventario - Frontend

Interfaz web desarrollada para la gestión de equipos de cómputo del sistema de inventario.

## Tecnologías

- React
- TypeScript
- Vite
- CSS
- Docker

## Funcionalidades

La aplicación permite:

- Visualizar los equipos registrados.
- Consultar información de los equipos.
- Crear nuevos equipos.
- Actualizar equipos existentes.
- Eliminar equipos.
- Consultar el estado de cada equipo.
- Conectarse con la API REST del backend.

## Estructura principal

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── services/
│   │   └── equiposService.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── Dockerfile
├── package.json
└── vite.config.ts
```