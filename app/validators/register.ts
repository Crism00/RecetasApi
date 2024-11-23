import vine from '@vinejs/vine'

export const registerNewUserValidator = vine.compile(
  vine.object({
    nombre: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(6).confirmed(),
  })
)
