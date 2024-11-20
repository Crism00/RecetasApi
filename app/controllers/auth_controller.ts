import type { HttpContext } from '@adonisjs/core/http'
import { registerNewUserValidator } from '#validators/register'
import { loginValidator } from '#validators/login'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    // Validar los datos de la solicitud
    const payload = await request.validateUsing(registerNewUserValidator)
    // Crear un nuevo usuario
    const user = await User.create(payload)
    // Responder con éxito si se crea el usuario
    if (user) {
      return response.status(201).json({
        msg: 'Usuario registrado con éxito',
        user, // Opcional: incluye los datos del usuario si es necesario
      })
    }
    return response.status(500).json({
      msg: 'Hubo un error al registrar el usuario',
    })
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const user = await User.findBy('email', payload.email)
    if (!user) {
      return response.status(401).json({
        msg: 'Usuario no encontrado',
      })
    }
    const isPasswordValid = await hash.verify(user.password, payload.password)
    if (!isPasswordValid) {
      return response.status(401).json({
        msg: 'La contraseña es incorrecta',
      })
    }
    const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30 days' })
    return response.status(200).json({
      msg: 'Usuario logueado correctamente',
      token: token,
    })
  }
}
