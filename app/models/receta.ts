import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Categoria from './categoria.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Valoracion from './valoracion.js'
import Comentario from './comentario.js'
import LikedReceta from './liked_receta.js'

export default class Receta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descripcion: string | null

  @column()
  declare usuario_id: number

  @column()
  declare categoria_id: number

  @column()
  declare dificultad: string

  @column()
  declare tiempo_preparacion: number

  @column()
  declare fecha_publicacion: Date

  @column()
  declare imagen: string | null

  @column()
  declare puntuacion_media: number | null

  @belongsTo(() => Categoria, {
    foreignKey: 'categoria_id', // Nombre del campo que une la relación
  })
  declare categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => User, {
    foreignKey: 'usuario_id', // Nombre del campo que une la relación
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Valoracion)
  declare valoraciones: HasMany<typeof Valoracion>

  @hasMany(() => Comentario)
  declare comentarios: HasMany<typeof Comentario>

  @hasMany(() => LikedReceta, {
    foreignKey: 'recetaId', // Nombre del campo que une la relación
  })
  declare likedRecetas: HasMany<typeof LikedReceta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
