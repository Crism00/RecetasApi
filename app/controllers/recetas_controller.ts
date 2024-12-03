import type { HttpContext } from '@adonisjs/core/http'
import Receta from '#models/receta'
import { storeValidator } from '#validators/receta'
import { standardResponse } from '../helpers/response.js'
import LikedReceta from '#models/liked_receta'

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

  async show({ response, params }: HttpContext) {
    const receta = await Receta.find(params.id)
    const userName = await receta?.related('user').query().select('nombre').first()
    if (!receta) {
      return response.status(404).json(standardResponse(404, 'Receta no encontrada'))
    }
    return response.status(200).json(
      standardResponse(200, 'Receta obtenida correctamente', {
        receta,
        userName: userName ? userName.nombre : null,
      })
    )
  }

  async getUserRecipes({ response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json(standardResponse(401, 'Usuario no autenticado'))
    }
    const recetas = await Receta.query().where('usuario_id', user.id).exec()
    return response
      .status(200)
      .json(standardResponse(200, 'Recetas obtenidas correctamente', { recetas }))
  }

  async getTop5Recipes({ response }: HttpContext) {
    const recetas = await Receta.query().orderBy('puntuacion_media', 'desc').limit(5).exec()
    return response
      .status(200)
      .json(standardResponse(200, 'Recetas obtenidas correctamente', { recetas }))
  }

  async likeRecipe({ response, auth, params }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json(standardResponse(401, 'Usuario no autenticado'))
    }
    if (!params.id) {
      return response.status(400).json(standardResponse(400, 'Falta el parámetro id'))
    }
    const receta = await Receta.find(params.id)
    if (!receta) {
      return response.status(404).json(standardResponse(404, 'Receta no encontrada'))
    }
    const likedReceta = new LikedReceta()
    likedReceta.recetaId = receta.id
    likedReceta.usuarioId = user.id
    await likedReceta.save()
    return response.status(200).json(standardResponse(200, 'Receta añadida a favoritos'))
  }

  async getLikedRecipes({ response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json(standardResponse(401, 'Usuario no autenticado'))
    }
    const likedRecetas = await LikedReceta.query().where('usuario_id', user.id).exec()
    const recetas = await Receta.query()
      .whereIn(
        'id',
        likedRecetas.map((lr) => lr.recetaId)
      )
      .exec()
    return response
      .status(200)
      .json(standardResponse(200, 'Recetas obtenidas correctamente', { recetas }))
  }
}
