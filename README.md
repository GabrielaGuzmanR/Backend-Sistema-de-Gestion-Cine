# Backend-Sistema-de-Gestion-Cine

Este es el backend del proyecto de Sistema de Gestión de Cine. Desarrollado con Node.js y Express, permite gestionar películas, salas, funciones, reservas y usuarios. Está conectado a una base de datos MySQL y desplegado en la plataforma [Render](https://render.com).

## Getting Started

Primero, clona el repositorio y corre el servidor de desarrollo:

```bash
git clone https://github.com/GabrielaGuzmanR/Backend-Sistema-de-Gestion-Cine.git
cd Backend-Sistema-de-Gestion-Cine
npm install
npm run dev

## Estructura del Proyecto

/Backend-Sistema-de-Gestion-Cine ├── /controllers # Lógica de negocio ├── /models # Esquemas de MongoDB ├── /routes # Definición de rutas ├── /services # Funciones auxiliares o servicios externos ├── /utils # Utilidades generales ├── app.js # Archivo principal de la app └── README.md

markdown

## Despliegue en Render

El backend está desplegado en [Render](https://render.com), lo que permite exponer una API pública para ser consumida por el frontend.

Para desplegarlo tú mismo:

1. Crea una cuenta en [Render](https://render.com)
2. Conecta tu repositorio desde GitHub
3. Crea un nuevo **servicio Web** con la siguiente configuración:
   - **Start command:** `npm run dev` o `node app.js` (según tu configuración)
   - **Environment:** Node.js
