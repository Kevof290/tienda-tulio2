# 🛒 La Tienda de Tulio

Tiemda tematica basada en el programa de televisión chileno **31 Minutos**, donde los personajes venden sus propios productos.

---

## 📺 Descripción

La Tienda de Tulio es una aplicación web fullstack de tipo marketplace donde los usuarios pueden:

- Explorar productos publicados por otros usuarios
- Registrarse e iniciar sesión con autenticación JWT
- Publicar, editar y eliminar sus propios productos
- Guardar productos en favoritos
- Filtrar productos por categoría y búsqueda en tiempo real

---

## 🚀 Tecnologías utilizadas

### Frontend
| Tecnología | Uso |
|-----------|-----|
| React 18 | Librería UI principal |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Navegación entre rutas |
| Context API | Estado global de sesión |
| Axios | Peticiones HTTP a la API |
| Bootstrap 5 | Estilos y componentes CSS |

### Backend
| Tecnología | Uso |
|-----------|-----|
| Node.js | Entorno de ejecución |
| Express | Framework servidor REST |
| PostgreSQL | Base de datos relacional |
| pg (node-postgres) | Conexión a PostgreSQL |
| bcryptjs | Encriptación de contraseñas |
| jsonwebtoken | Autenticación con JWT |
| cors | Permitir peticiones del frontend |
| dotenv | Variables de entorno |
| supertest | Tests de rutas API |
| jest | Framework de testing |

---

## 📦 Instalación y uso

### Requisitos previos
- Node.js instalado
- PostgreSQL instalado y corriendo
- npm instalado

---

### 1. Clonar el repositorio
```bash
git clone https://github.com/Kevof290/tienda-tulio2
cd tu-repositorio
```

### 2. Configurar la base de datos

Abre pgAdmin y ejecuta el archivo `backend/script.sql`:
```sql
-- Crear la base de datos
CREATE DATABASE tienda_tulio;

-- Luego conectarse a tienda_tulio y ejecutar script.sql
```

### 3. Configurar el Backend
```bash
cd backend
npm install
```

Crea el archivo `.env` dentro de la carpeta `backend/`:
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tienda_tulio
DB_USER=postgres
DB_PASSWORD=tu_password_aqui     ← tu contraseña de PostgreSQL
JWT_SECRET=tu_clave_secreta_aqui ← cualquier texto secreto
```

El backend quedará corriendo en `http://localhost:3001`

### 4. Configurar el Frontend
```bash
cd frontend
npm install
npm run dev
```

El frontend quedará corriendo en `http://localhost:5173`

### 5. Crear usuario de prueba

Con ambos servidores corriendo, regístrate directamente en:
```
http://localhost:5173/register
```

---

## 🗺️ Rutas de la aplicación

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Página principal con carrusel |
| `/register` | Público | Registro de usuario |
| `/login` | Público | Inicio de sesión |
| `/gallery` | Público | Galería de productos |
| `/gallery-demo` | Público | Galería con datos de prueba |
| `/product/:id` | Privado | Detalle de producto |
| `/profile` | Privado | Perfil del usuario |
| `/create` | Privado | Crear publicación |
| `/edit/:id` | Privado | Editar publicación |

---

## ⚠️ Nota sobre datos de prueba

La ruta `/gallery-demo` muestra productos de prueba (mock data) para
demostración visual sin necesidad de tener el backend configurado.

La ruta `/gallery` consume datos reales desde la API REST. Para ver
productos ahí debes tener el backend corriendo y haber creado
publicaciones desde `/create`.

---

## 👥 Autor

Desarrollado por Kevin Alfaro.-