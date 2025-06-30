# 🛍️ E-commerce Frontend

Este es el frontend de una aplicación de comercio electrónico que permite autenticación, gestión de productos y pedidos, y control de acceso por roles (ADMIN, SELLER, CUSTOMER).

## 🧩 Tecnologías utilizadas

- React + Vite
- React Query
- Zustand (manejo de estado)
- React Hook Form + Zod (formularios y validación)
- TailwindCSS + Shadcn/UI (estilos y componentes)
- Axios (peticiones HTTP)
- JWT para autenticación
- TypeScript

---

## ⚙️ Requisitos

- Node.js >= 18
- Yarn o npm
- Acceso a una API backend compatible (ver notas al final)

---

## 🚀 Instalación y ejecución

### 🔧 Clonar el repositorio

```bash
git clone https://github.com/Valdo-177/front_test_ecomerce
cd front_test_ecomerce
````

### 📦 Instalar dependencias

```bash
yarn install
# o con npm
npm install
```

### ⚙️ Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto y define la URL de tu backend:

```env
VITE_API_URL=http://localhost:5000/api
```

> Asegúrate de que el backend esté corriendo y accesible desde esta URL.

---

## 🖥️ Ejecutar el proyecto

```bash
yarn dev
# o
npm run dev
```

Esto abrirá la aplicación en `http://localhost:5173`.

---

## 🧠 Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables
├── hooks/              # Custom hooks (ej. useLogin, useOrders)
├── pages/              # Páginas principales
├── store/              # Zustand store
├── lib/                # Configuración global (axios, utils)
├── routes/             # Configuración de rutas
├── types/              # Tipos de TypeScript
└── App.tsx             # Componente raíz
```

---

## 🛠 Funcionalidades

### ✅ Autenticación

* Inicio de sesión con JWT
* Persistencia de sesión (Zustand + localStorage)
* Redirecciones según rol

### 🛍️ Productos

* Crear, actualizar y eliminar productos (SELLER/ADMIN)
* Visualización de productos propios

### 📦 Órdenes

* Crear y consultar pedidos (CUSTOMER)
* Actualizar o cancelar dentro de 60 minutos
* ADMIN puede cambiar el estado de cualquier orden

---

## 🧪 Manejo de estado y datos

* **React Query** se usa para el manejo de datos asincrónicos (fetch, cache, revalidación).
* **Zustand** se usa para autenticación (`useAuthStore`), carrito, y sesión del usuario.

---

## 🔐 Roles y navegación

* El acceso a rutas está protegido por roles.
* Se renderiza contenido dinámico según el rol del usuario (`ADMIN`, `SELLER`, `CUSTOMER`).
* Rutas privadas redireccionan si el usuario no está autenticado.

---

## 🔧 Scripts útiles

```bash
yarn dev        # Modo desarrollo
yarn build      # Compilar para producción
yarn preview    # Servir build localmente
```

---

## 📌 Notas

* Esta app depende de un backend funcional que exponga endpoints en `/api`.
* JWT se guarda en `localStorage` y se envía con cada petición en el header `Authorization: Bearer <token>`.
* El frontend muestra mensajes de error y éxito en inglés.
* Puedes cambiar el diseño con los temas y utilidades de `shadcn/ui`.

---
