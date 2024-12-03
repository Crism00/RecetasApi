// import type { HttpContext } from '@adonisjs/core/http'

import Receta from '#models/receta'
import Valoracion from '#models/valoracion'
import { HttpContext } from '@adonisjs/core/http'
import { standardResponse } from '../helpers/response.js'

export default class ValoracionesController {
  public async store({ request, response, auth }: HttpContext) {
    // Obtener datos de la solicitud
    const payload = request.only(['receta_id', 'puntuacion'])

    // Crear una nueva valoración
    const valoracion = new Valoracion()
    valoracion.recetaId = payload.receta_id
    valoracion.puntuacion = payload.puntuacion
    if (auth.user?.id !== undefined) {
      valoracion.usuarioId = auth.user.id
    } else {
      return response.status(401).json(standardResponse(401, 'Usuario no autenticado'))
    }

    // Obtener la receta y todas sus valoraciones
    const receta = await Receta.findOrFail(payload.receta_id)
    const valoraciones = await receta.related('valoraciones').query()
    const userValoracion = valoraciones.find((v) => v.usuarioId === valoracion.usuarioId)
    if (userValoracion) {
      return response.status(400).json(standardResponse(400, 'Ya has valorado esta receta'))
    }
    await valoracion.save()
    // Calcular la puntuación media
    const puntuaciones = valoraciones.map((v) => v.puntuacion)
    const puntuacionMedia = puntuaciones.reduce((sum, val) => sum + val, 0) / puntuaciones.length

    // Actualizar la puntuación media de la receta
    receta.puntuacion_media = puntuacionMedia // Asegúrate de que la columna 'puntuacion_media' existe en el modelo
    await receta.save()
    if (!receta) {
      return response
        .status(500)
        .json(standardResponse(500, 'Hubo un error al guardar la valoración'))
    }

    // Responder con la valoración creada
    return response
      .status(200)
      .json(standardResponse(201, 'Valoración creada', { valoracion, receta }))
  }
}
