-- ── Tabla users
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  picture    TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ── Tabla posts
CREATE TABLE IF NOT EXISTS posts (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  price       NUMERIC(10,2) NOT NULL,
  category    VARCHAR(100),
  image       TEXT,
  location    VARCHAR(255),
  user_id     INT REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── Tabla favorites
CREATE TABLE IF NOT EXISTS favorites (
  id         SERIAL PRIMARY KEY,
  user_id    INT REFERENCES users(id) ON DELETE CASCADE,
  post_id    INT REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Crear usuarios de prueba usando el endpoint:
-- POST http://localhost:3001/api/users/register
-- Body: { "name": "Tulio Triviño", "email": "tulio@31minutos.cl", "password": "password123" }