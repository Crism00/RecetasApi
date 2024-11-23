import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recetas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo').notNullable()
      table.text('descripcion').nullable()
      table.integer('usuario_id').unsigned().notNullable()
      table.integer('categoria_id').references('id').inTable('categorias').notNullable().unsigned()
      table.string('dificultad').notNullable()
      table.string('tiempo_preparacion').notNullable()
      table.date('fecha_publicacion').notNullable()
      table.string('imagen').nullable()
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
