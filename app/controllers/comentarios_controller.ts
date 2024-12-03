import type { HttpContext } from '@adonisjs/core/http'
import { storeValidator } from '#validators/comentario'
import Comentario from '#models/comentario'
import { standardResponse } from '../helpers/response.js'

export default class ComentariosController {
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(storeValidator)
      payload.usuario_id = auth.user?.id
      const comentario = await Comentario.create(payload)
      if (comentario) {
        return response
          .status(200)
          .json(standardResponse(200, 'Comentario creado correctamente', { comentario }))
      }

      return response
        .status(500)
        .json(standardResponse(500, 'Hubo un error al guardar el comentario'))
    } catch (error) {
      return response
        .status(500)
        .json(standardResponse(500, 'Hubo un error al guardar el comentario', { error }))
    }
  }
}
