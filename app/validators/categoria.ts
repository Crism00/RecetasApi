import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    nombre: vine.string(),
  })
)
