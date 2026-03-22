const { Pool }  = require('pg')
const bcrypt    = require('bcryptjs')
require('dotenv').config()

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const seed = async () => {
  try {
    console.log('🌱 Iniciando seed...')

    const hash = await bcrypt.hash('password123', 10)

    await pool.query(`
  TRUNCATE TABLE favorites, posts, users RESTART IDENTITY CASCADE
`)
console.log('✅ Tablas limpiadas')

    // ── Usuarios
    await pool.query(`
      INSERT INTO users (name, email, password, picture) VALUES
      ($1,  $2,  $3, $4),
      ($5,  $6,  $7, $8),
      ($9,  $10, $11, $12),
      ($13, $14, $15, $16),
      ($17, $18, $19, $20),
      ($21, $22, $23, $24)
      ON CONFLICT (email) DO NOTHING
    `, [
      'Tulio Triviño',           'tulio@31minutos.cl',     hash, null,
      'Bodoque',                 'bodoque@31minutos.cl',   hash, null,
      'Patana del Monte',        'patana@31minutos.cl',    hash, null,
      'Juánin Juan',             'juanin@31minutos.cl',    hash, null,
      'Calcetín con Rombos Man', 'calcetin@31minutos.cl',  hash, null,
      'Policarpo',               'policarpo@31minutos.cl', hash, null,
    ])
    console.log('✅ Usuarios creados')

    // ── Publicaciones
    await pool.query(`
      INSERT INTO posts (title, description, price, category, image, location, user_id) VALUES
      (
        'Shampoo Platinum de Tulio',
        'El único shampoo desarrollado por un comunicador de excelencia. Si tu pelo no brilla como el mío, claramente no estás usando el producto correcto. Resultados garantizados o te devuelvo mi autógrafo.',
        4990, 'Belleza',
        'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Santiago, Chile', 1
      ),
      (
        'Gomina Extreme de Tulio',
        'Llevo 15 años al aire y mi pelo jamás se ha movido. ¿Coincidencia? No lo creo. Esta gomina es la razón por la que soy el rostro más reconocido de la televisión chilena. La tuya también.',
        3500, 'Belleza',
        'https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Santiago, Chile', 1
      ),
      (
        'Libro: La Verdad según Bodoque',
        'Después de años investigando lo que nadie se atreve a investigar, compilé todo en este libro. No es para todo público. De hecho, probablemente no es para ti. Pero cómpralo igual.',
        8500, 'Libros',
        'https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Valparaíso, Chile', 2
      ),
      (
        'Guía de Periodismo Serio',
        'Una guía para los que quieren hacer periodismo de verdad, no como mi compañero de escritorio. Incluye capítulo especial: cómo mantener la dignidad cuando tu jefe se cree mejor que tú.',
        6990, 'Libros',
        'https://plus.unsplash.com/premium_photo-1691223733678-095fee90a0a7?q=80&w=1821&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Valparaíso, Chile', 2
      ),
      (
        'Snack Mix de Patana',
        'Los mismos snacks que como entre reportaje y reportaje mientras Tulio se arregla el pelo por cuarta vez. Nutritivos, deliciosos y preparados con el amor de alguien que claramente merece más pantalla.',
        2990, 'Alimentos',
        'https://plus.unsplash.com/premium_photo-1679591002405-13fec066bd53?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Concepción, Chile', 3
      ),
      (
        'Mermelada Artesanal del Monte',
        'Hecha con frutas que yo misma recolecté mientras mis colegas estaban en maquillaje. Sin conservantes, sin colorantes y sin la hipocresía del mundo televisivo. Solo fruta honesta de alguien honesta.',
        4500, 'Alimentos',
        'https://plus.unsplash.com/premium_photo-1669653004204-aff63da3085b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Concepción, Chile', 3
      ),
      (
        'Muñeco Oficial de Tulio',
        'Un muñeco con mi imagen exacta. Mismo pelo, mismo traje, mismo nivel de carisma. Ideal para los que no pueden verme todos los días en el noticiero, aunque no entiendo cómo alguien puede perderse eso.',
        15000, 'Juguetes',
        'https://i.pinimg.com/736x/df/5c/c4/df5cc42a7aa40c8ac3b6ab70887f9ea3.jpg',
        'Santiago, Chile', 1
      ),
      (
        'Polera Oficial 31 Minutos',
        'Úsala y la gente pensará que tienes buen gusto. No incluye el talento ni la presencia televisiva, eso es intransferible. Disponible en todas las tallas porque la cultura no discrimina.',
        12000, 'Juguetes',
        'https://cdnx.jumpseller.com/lamia/image/68538640/31-Minutos-0001.jpg?1760109000',
        'Santiago, Chile', 1
      ),
      (
        'Curso de Baile Moderno con Juánin',
        'Llevo años perfeccionando mis movimientos y por fin los comparto con el mundo. No garantizo que quedes tan bien como yo, de hecho es prácticamente imposible, pero al menos lo intentarás. Efectivamente. Necesitas una escoba para esto.',
        25000, 'Juguetes',
        'https://31minutosoficial.cl/w/juaninsite/1516915_1418220001772036_743573176_n.jpg',
        'Viña del Mar, Chile', 4
      ),
      (
        'Gel Fijador Juánin Edition',
        'El secreto detrás de mi look inigualable. Úsalo con moderación porque no todo el mundo tiene la estructura ósea para lucirlo como yo. Advertencia: puede causar exceso de confianza.',
        5500, 'Belleza',
        'https://rimage.ripley.cl/home.ripley/Attachment/MKP/8159/MPM10003003575/full_image-1',
        'Viña del Mar, Chile', 4
      ),
      (
        'Calcetín con Rombos Edición Coleccionable',
        'No soy un calcetín cualquiera. Soy un superhéroe. Este calcetín fue usado en una batalla épica contra las fuerzas del mal. Lavado a mano solamente, porque los héroes merecen cuidado especial.',
        9990, 'Juguetes',
        'https://previews.123rf.com/images/benaung/benaung1607/benaung160700044/66833927-used-sock-isolated-on-a-white-background.jpg',
        'El universo, Chile', 5
      ),
      (
        'Manual del Superhéroe Textil',
        'Todo lo que necesitas saber para convertirte en un héroe como yo. Spoiler: necesitas ser calcetín. Si no lo eres, igual cómpralo, el mundo necesita más héroes aunque sean de algodón.',
        7500, 'Libros',
        'https://tienda31minutos.cl/wp-content/uploads/2024/12/portada_calcetin-con-rombos-man-el-origen_31-minutos_202410211535.png',
        'El universo, Chile', 5
      ),
      (
        'Recetario de Cocina Fina de Policarpio',
        'Años de experiencia culinaria compilados en un libro. Cada receta fue probada y aprobada por mí mismo, que soy el mejor juez que conozco. Incluye maridaje con jugos de caja.',
        12000, 'Libros',
        'https://static.theclinic.cl/media/2012/07/policarpo-pelado.jpg',
        'Puerto Montt, Chile', 6
      ),
      (
        'Kit de Asado Policarpo Premium',
        'Todo lo necesario para hacer el mejor asado de tu vida, o al menos intentarlo. Incluye pinche, delantal y las instrucciones que claramente nadie va a leer. El carbón no está incluido porque eso es cosa tuya.',
        18500, 'Alimentos',
        'https://www.empresasctm.cl/wp-content/uploads/2024/07/1-10.jpg',
        'Puerto Montt, Chile', 6
      )
      ON CONFLICT DO NOTHING
    `)
    console.log('✅ Productos creados')

    console.log('🎉 Seed completado')
    console.log('📧 Credenciales de prueba:')
    console.log('   tulio@31minutos.cl      → password123')
    console.log('   bodoque@31minutos.cl    → password123')
    console.log('   patana@31minutos.cl     → password123')
    console.log('   juanin@31minutos.cl     → password123')
    console.log('   calcetin@31minutos.cl   → password123')
    console.log('   policarpo@31minutos.cl  → password123')

  } catch (err) {
    console.error('❌ Error en seed:', err)
  } finally {
    await pool.end()
  }
}

seed()