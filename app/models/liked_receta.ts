import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Receta from './receta.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class LikedReceta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare recetaId: number

  @column()
  declare usuarioId: number

  @belongsTo(() => Receta, {
    foreignKey: 'recetaId', // Nombre del campo que une la relación
  })
  declare receta: BelongsTo<typeof Receta>

  @belongsTo(() => User, {
    foreignKey: 'usuarioId', // Nombre del campo que une la relación
  })
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
