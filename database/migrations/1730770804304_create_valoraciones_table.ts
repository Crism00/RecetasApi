import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'valoraciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').references('id').inTable('users').notNullable().unsigned()
      table.integer('receta_id').references('id').inTable('recetas').notNullable().unsigned()
      table.integer('puntuacion').notNullable()
      table.timestamp('fecha_valoracion')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
