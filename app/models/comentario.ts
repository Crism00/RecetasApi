import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Receta from './receta.js'

export default class Comentario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuarioId: number

  @column()
  declare recetaId: number

  @column()
  declare contenido: string

  @belongsTo(() => User, {
    foreignKey: 'usuarioId',
  })
  declare usuario: BelongsTo<typeof User>

  @belongsTo(() => Receta, {
    foreignKey: 'recetaId',
  })
  declare receta: BelongsTo<typeof Receta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
