import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Categoria from './categoria.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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
  declare tiempo_preparacion: string

  @column()
  declare fecha_publicacion: string

  @column()
  declare imagen: string | null

  @belongsTo(() => Categoria)
  declare categoria: BelongsTo<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
