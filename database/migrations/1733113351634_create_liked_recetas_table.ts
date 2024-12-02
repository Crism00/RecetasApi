import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'liked_recetas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('receta_id').unsigned().references('recetas.id').onDelete('CASCADE')
      table.integer('usuario_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
