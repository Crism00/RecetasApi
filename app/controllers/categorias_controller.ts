import type { HttpContext } from '@adonisjs/core/http'
import { storeValidator } from '#validators/categoria'
import Categoria from '#models/categoria'

export default class CategoriasController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const categoria = await Categoria.create(payload)
    if (categoria) {
      return response.status(200).json({
        msg: 'Categoria creada correctamente',
        categoria,
      })
    }

    return response.status(500).json({
      msg: 'Hubo un error al guardar la categoria',
    })
  }

  async index({ response }: HttpContext) {
    const categorias = await Categoria.all()
    return response.status(200).json({
      categorias,
    })
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const categoria = await Categoria.findOrFail(params.id)
    categoria.merge(payload)
    await categoria.save()
    return response.status(200).json({
      msg: 'Categoria actualizada correctamente',
      categoria,
    })
  }
}
