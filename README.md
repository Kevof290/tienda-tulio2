# 🛒 La Tienda de Tulio

E-Commerce temático basado en el programa de televisión chileno **31 Minutos**, donde los personajes venden sus propios productos.

🌐 **Demo en producción:** [https://tienda-tulio2.vercel.app](https://tienda-tulio2.vercel.app)

---

## 📺 Descripción

La Tienda de Tulio es una aplicación web fullstack de tipo marketplace donde los usuarios pueden:

- Explorar productos publicados por otros usuarios sin necesidad de registrarse
- Registrarse e iniciar sesión con autenticación JWT
- Publicar, editar y eliminar sus propios productos
- Guardar productos en favoritos
- Agregar productos al carrito y proceder al checkout
- Filtrar productos por categoría y búsqueda en tiempo real
- Editar su perfil personal con nombre, email y foto

---

## 🚀 Tecnologías utilizadas

### Frontend
| Tecnología | Uso |
|-----------|-----|
| React 18 | Librería UI principal |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Navegación entre rutas |
| Context API | Estado global de sesión y carrito |
| Axios | Peticiones HTTP a la API |
| Bootstrap 5 | Estilos y componentes CSS |

### Backend
| Tecnología | Uso |
|-----------|-----|
| Node.js | Entorno de ejecución |
| Express | Framework servidor REST |
| PostgreSQL | Base de datos relacional |
| pg (node-postgres) | Conexión a PostgreSQL con Pool |
| bcryptjs | Encriptación de contraseñas |
| jsonwebtoken | Autenticación con JWT |
| cors | Permitir peticiones del frontend |
| dotenv | Variables de entorno |
| supertest | Tests de rutas API |
| jest | Framework de testing |

### Deploy
| Servicio | Uso |
|---------|-----|
| Vercel | Frontend (deploy automático desde GitHub) |
| Render | Backend Node.js + Base de datos PostgreSQL |

---

## ⚓ Hooks utilizados

| Hook | Dónde se usa |
|------|-------------|
| `useState` | Todos los componentes con estado |
| `useEffect` | Gallery, Profile, ProductDetail, EditPost |
| `useContext` | A través de los hooks personalizados `useAuth()` y `useCart()` |
| `useNavigate` | Redirección programática en formularios |
| `useParams` | ProductDetail y EditPost para leer el :id de la URL |
| `useSearchParams` | Gallery para leer ?categoria= de la URL |
| `useAuth` (custom) | Estado global de sesión en toda la app |
| `useCart` (custom) | Estado global del carrito en toda la app |

---

## 🗺️ Rutas de la aplicación

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Página principal con carrusel y categorías |
| `/register` | Público | Registro de usuario |
| `/login` | Público | Inicio de sesión |
| `/gallery` | Público | Galería de productos con búsqueda y filtros |
| `/gallery-demo` | Público | Galería con datos de prueba (mock data) |
| `/product/:id` | Público | Detalle de producto |
| `/cart` | Público | Carrito de compras |
| `/profile` | Privado 🔒 | Perfil del usuario con editor |
| `/create` | Privado 🔒 | Crear publicación |
| `/edit/:id` | Privado 🔒 | Editar publicación |
| `/checkout` | Privado 🔒 | Checkout y confirmación de pedido |

---

## 📦 Instalación local

### Requisitos previos
- Node.js instalado
- PostgreSQL instalado y corriendo
- npm instalado

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Configurar la base de datos
Abre pgAdmin y ejecuta el archivo `backend/script.sql`:
```sql
-- Primero crear la base de datos
CREATE DATABASE tienda_tulio;
-- Luego conectarse a tienda_tulio y ejecutar script.sql
```

### 3. Configurar el Backend
```bash
cd backend
npm install
```

Crea el archivo `.env` dentro de `backend/`:
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tienda_tulio
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
JWT_SECRET=tu_clave_secreta_aqui
```

Poblar con datos de prueba:
```bash
npm run seed
```

Levantar el servidor:
```bash
npm run dev
```

### 4. Configurar el Frontend
```bash
cd frontend
npm install
```

Crea el archivo `.env` dentro de `frontend/`:
```
VITE_API_URL=http://localhost:3001/api
```

Levantar el frontend:
```bash
npm run dev
```

---

## 🧪 Tests
```bash
cd backend
npm test
```

Cubre 4 rutas con múltiples escenarios:
- `POST /api/users/register` → 201 y 400
- `POST /api/users/login` → 200 y 401
- `GET /api/posts` → 200
- `GET /api/posts/:id` → 404
- `GET /api/favorites` → 200 y 401

---

## 👤 Usuarios de prueba

| Email | Contraseña | Personaje |
|-------|-----------|-----------|
| tulio@31minutos.cl | password123 | Tulio Triviño |
| bodoque@31minutos.cl | password123 | Bodoque |
| patana@31minutos.cl | password123 | Patana del Monte |
| juanin@31minutos.cl | password123 | Juánin Juan |
| calcetin@31minutos.cl | password123 | Calcetín con Rombos Man |
| policarpo@31minutos.cl | password123 | Policarpo |

---

## ⚠️ Nota sobre datos de prueba

La ruta `/gallery-demo` muestra productos de prueba (mock data) para
demostración visual sin necesidad de tener el backend configurado.

La ruta `/gallery` consume datos reales desde la API REST. Para ver
productos ahí debes tener el backend corriendo y haber ejecutado
`npm run seed`.

---

## 🏗️ Decisiones de arquitectura

El frontend y el backend están deployados en servicios separados —
Vercel y Render respectivamente. Esto permite mantener el código del
servidor Express exactamente como fue desarrollado, sin adaptaciones
a un modelo serverless. Las variables de entorno apuntan a la base de
datos externa en Render tanto en producción como opcionalmente en local.

---

## 👥 Autor

Desarrollado por **Kevin Alfaro** para el bootcamp de Desafío Latam.