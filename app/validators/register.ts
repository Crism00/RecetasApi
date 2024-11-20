import vine from '@vinejs/vine'

export const registerNewUserValidator = vine.compile(
  vine.object({
    nombre: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(6).confirmed(),
  })
)
