import type { HttpContext } from '@adonisjs/core/http'
import { storeValidator, updateValidator } from '#validators/categoria'
import Categoria from '#models/categoria'
import { standardResponse } from '../helpers/response.js'

export default class CategoriasController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const categoria = await Categoria.create(payload)
    if (categoria) {
      return response
        .status(200)
        .json(standardResponse(200, 'Categoria creada correctamente', { categoria }))
    }

    return response.status(500).json(standardResponse(500, 'Hubo un error al guardar la categoria'))
  }

  async index({ response }: HttpContext) {
    const categorias = await Categoria.all()
    return response
      .status(200)
      .json(standardResponse(200, 'Categorias obtenidas correctamente', { categorias }))
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateValidator(params.id))
    const categoria = await Categoria.findOrFail(params.id)
    categoria.merge(payload)
    if (await categoria.save()) {
      return response
        .status(200)
        .json(standardResponse(200, 'Categoria actualizada correctamente', { categoria }))
    }
  }
}
