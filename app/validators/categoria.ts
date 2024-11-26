import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    nombre: vine.string().unique(async (db, value, field) => {
      const categoria = await db.from('categorias').where('nombre', value).first()
      return !categoria
    }),
  })
)

export const updateValidator = (params: { id: any }) =>
  vine.compile(
    vine.object({
      nombre: vine.string().unique(async (db, value, field) => {
        const categoria = await db.from('categorias').where('nombre', value).first()
        if (categoria) {
          // Permitir el mismo nombre si se está editando la misma categoría
          return !(categoria.id === params.id)
        } else {
          return true
        }
      }),
    })
  )
