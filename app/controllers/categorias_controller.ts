import type { HttpContext } from '@adonisjs/core/http'
import { storeValidator, updateValidator } from '#validators/categoria'
import Categoria from '#models/categoria'
import { standardResponse } from '../helpers/response.js'

export default class CategoriasController {
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(storeValidator)
      const categoria = await Categoria.create(payload)
      if (categoria) {
        return response
          .status(200)
          .json(standardResponse(200, 'Categoria creada correctamente', { categoria }))
      }

      return response
        .status(500)
        .json(standardResponse(500, 'Hubo un error al guardar la categoria'))
    } catch (error) {
      return response.status(500).json(standardResponse(500, error.message, { error }))
    }
  }

  async index({ response }: HttpContext) {
    try {
      const categorias = await Categoria.all()
      return response
        .status(200)
        .json(standardResponse(200, 'Categorias obtenidas correctamente', { categorias }))
    } catch (error) {
      return response.status(500).json(standardResponse(500, error.message, { error }))
    }
  }

  async update({ request, response, params }: HttpContext) {
    try {
      const categoria = await Categoria.find(params.id)
      if (!categoria) {
        return response.status(404).json(standardResponse(404, 'Categoria no encontrada'))
      }
      const payload = await request.validateUsing(updateValidator({ id: params.id }))
      categoria.merge(payload)
      if (await categoria.save()) {
        return response
          .status(200)
          .json(standardResponse(200, 'Categoria actualizada correctamente', { categoria }))
      }
    } catch (error) {
      return response.status(500).json(standardResponse(500, error.message, { error }))
    }
  }
}
