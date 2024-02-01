import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users_books';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id', 11).references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.string('title');
      table.string('author');
      table.string('pages');
      table.date('start_date');
      table.date('end_date');
      table.integer('rate');
      table.text('review');
      table.string('small_thumbnail');
      table.string('thumbnail');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
