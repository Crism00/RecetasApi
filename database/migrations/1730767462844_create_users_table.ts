import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nombre').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('biografia').nullable()
      table.string('imagen').nullable()
      table.timestamp('fecha_registro')
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
