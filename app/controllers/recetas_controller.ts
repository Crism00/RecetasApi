import type { HttpContext } from '@adonisjs/core/http'
import Receta from '#models/receta'
import { storeValidator } from '#validators/receta'
import { standardResponse } from '../helpers/response.js'

export default class RecetasController {
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(storeValidator)
      const receta = await Receta.create(payload)
      if (receta) {
        return response
          .status(200)
          .json(standardResponse(200, 'Receta creada correctamente', { receta }))
      }

      return response.status(500).json({
        msg: 'Hubo un error al guardar la receta',
      })
    } catch (error) {
      return response.status(500).json(standardResponse(500, error.message, { error }))
    }
  }
  async index({ request, response }: HttpContext) {
    let recetasQuery = Receta.query().preload('user')

    const categoria = request.qs().categoria
    if (categoria) {
      recetasQuery = recetasQuery.where('categoria_id', categoria)
    }

    const recetas = await recetasQuery.exec()
    return response
      .status(200)
      .json(standardResponse(200, 'Recetas obtenidas correctamente', { recetas }))
  }

  async update({ request, response, params }: HttpContext) {
    try {
      const receta = await Receta.find(params.id)
      if (!receta) {
        return response.status(404).json(standardResponse(404, 'Receta no encontrada'))
      }
      const payload = await request.validateUsing(storeValidator)
      receta.merge(payload)
      if (await receta.save()) {
        return response
          .status(200)
          .json(standardResponse(200, 'Receta actualizada correctamente', { receta }))
      }
    } catch (error) {
      return response.status(500).json(standardResponse(500, error.message, { error }))
    }
  }
}
