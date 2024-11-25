import type { HttpContext } from '@adonisjs/core/http'
import Receta from '#models/receta'
import { storeValidator } from '#validators/receta'

export default class RecetasController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const receta = await Receta.create(payload)
    if (receta) {
      return response.status(200).json({
        msg: 'Receta creada correctamente',
        receta,
      })
    }

    return response.status(500).json({
      msg: 'Hubo un error al guardar la receta',
    })
  }

  async index({ response }: HttpContext) {
    const recetas = await Receta.all()
    return response.status(200).json({
      recetas,
    })
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const receta = await Receta.findOrFail(params.id)
    receta.merge(payload)
    await receta.save()
    return response.status(200).json({
      msg: 'Receta actualizada correctamente',
      receta,
    })
  }
}
