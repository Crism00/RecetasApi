import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    recetaId: vine.number(),
    contenido: vine.string(),
  })
)
