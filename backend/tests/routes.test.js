const request = require('supertest')
const app     = require('../index')


// USUARIOS
describe('POST /api/users/register', () => {

  it('debe responder 201 al registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name:     'Test User',
        email:    `test${Date.now()}@31minutos.cl`, // email único cada vez
        password: '123456'
      })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('user')
  })

  it('debe responder 400 si el email ya está registrado', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name:     'Tulio Triviño',
        email:    'tulio@31minutos.cl', // email que ya existe
        password: '123456'
      })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

})

describe('POST /api/users/login', () => {

  it('debe responder 200 y devolver token con credenciales correctas', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email:    'tulio@31minutos.cl',
        password: '123456'
      })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
  })

  it('debe responder 401 con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email:    'tulio@31minutos.cl',
        password: 'contraseña_incorrecta'
      })
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })

  it('debe responder 401 con email que no existe', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email:    'noexiste@31minutos.cl',
        password: '123456'
      })
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })

})

// PUBLICACIONES
describe('GET /api/posts', () => {

  it('debe responder 401 sin token', async () => {
    const res = await request(app)
      .get('/api/posts')
    expect(res.status).toBe(401)
  })

  it('debe responder 200 con token válido', async () => {
    const login = await request(app)
      .post('/api/users/login')
      .send({ email: 'tulio@31minutos.cl', password: '123456' })

    const token = login.body.token

    const res = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

})

describe('GET /api/posts/:id', () => {

  it('debe responder 404 si la publicación no existe', async () => {
    const login = await request(app)
      .post('/api/users/login')
      .send({ email: 'tulio@31minutos.cl', password: '123456' })

    const token = login.body.token

    const res = await request(app)
      .get('/api/posts/999999')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
  })

})

// FAVORITOS
describe('GET /api/favorites', () => {

  it('debe responder 401 sin token', async () => {
    const res = await request(app)
      .get('/api/favorites')
    expect(res.status).toBe(401)
  })

  it('debe responder 200 con token válido', async () => {
    const login = await request(app)
      .post('/api/users/login')
      .send({ email: 'tulio@31minutos.cl', password: '123456' })

    const token = login.body.token

    const res = await request(app)
      .get('/api/favorites')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

})