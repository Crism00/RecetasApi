import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    titulo: vine.string(),
    descripcion: vine.string(),
    usuario_id: vine.number().exists(async (db, value, field) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    categoria_id: vine.number().exists(async (db, value, field) => {
      const categoria = await db.from('categorias').where('id', value).first()
      return !!categoria
    }),
    dificultad: vine.string().in(['facil', 'medio', 'dificil']),
    tiempo_preparacion: vine.number(),
    fecha_publicacion: vine.date(),
    imagen: vine.string(),
  })
)
