import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comentarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').references('id').inTable('users').notNullable().unsigned()
      table.integer('receta_id').references('id').inTable('recetas').notNullable().unsigned()
      table.text('contenido').notNullable()
      table.timestamp('fecha_comentario')
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
