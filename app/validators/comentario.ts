import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    receta_id: vine.number(),
    contenido: vine.string(),
    usuario_id: vine.number().optional(),
  })
)
