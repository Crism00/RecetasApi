import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    nombre: vine.string().unique(async (db, value, field) => {
      const categoria = await db.from('categorias').where('nombre', value).first()
      return !categoria
    }),
  })
)

export const updateValidator = (params: { id: number }) =>
  vine.compile(
    vine.object({
      nombre: vine.string().unique(async (db, value, field) => {
        if (!params.id) {
          throw new Error('El parámetro id es requerido')
        }
        const categoria = await db
          .from('categorias')
          .where('nombre', value)
          .whereNot('id', params.id)
          .first()
        return !categoria
      }),
    })
  )
