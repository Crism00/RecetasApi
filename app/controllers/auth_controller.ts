import { HttpContext } from '@adonisjs/core/http'
import { registerNewUserValidator } from '#validators/register'
import { loginValidator } from '#validators/login'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { standardResponse } from '../helpers/response.js'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    // Validar los datos de la solicitud
    const payload = await request.validateUsing(registerNewUserValidator)
    // Crear un nuevo usuario
    const user = await User.create(payload)
    // Responder con éxito si se crea el usuario
    if (user) {
      return response
        .status(201)
        .json(standardResponse(201, 'Usuario registrado con éxito', { user }))
    }
    return response.status(500).json(standardResponse(500, 'Hubo un error al registrar el usuario'))
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const user = await User.findBy('email', payload.email)
    if (!user) {
      return response.status(401).json(standardResponse(401, 'Error en las credenciales'))
    }
    const isPasswordValid = await hash.verify(user.password, payload.password)
    if (!isPasswordValid) {
      return response.status(401).json(standardResponse(401, 'Error en las credenciales'))
    }
    const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30 days' })
    return response
      .status(200)
      .json(standardResponse(200, 'Usuario logueado correctamente', { token }))
  }

  async infoAuthUser({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json(standardResponse(401, 'Usuario no autenticado'))
    }
    return response.status(200).json(standardResponse(200, 'Usuario autenticado', { user }))
  }

  async update({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json(standardResponse(401, 'Usuario no autenticado'))
    }
    const payload = request.only(['name', 'email'])
    user.merge(payload)
    if (await user.save()) {
      return response
        .status(200)
        .json(standardResponse(200, 'Usuario actualizado correctamente', { user }))
    }
    return response
      .status(500)
      .json(standardResponse(500, 'Hubo un error al actualizar el usuario'))
  }
}
