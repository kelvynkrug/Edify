import DataAccessService from './DataAccessService';
import Database from '@ioc:Adonis/Lucid/Database';
import Book from 'App/Models/Access/Book';
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';

export default class BookService {
  private dataAccessService = new DataAccessService<typeof Book>(Book);

  public async create(record: Record<string, any>): Promise<Book> {
    let book: Book = new Book().fill(record);

    await Database.transaction(async (trx) => {
      book.useTransaction(trx);

      await book.save();
    });

    return book;
  }

  public async update(record: Record<string, any>): Promise<Book> {
    let book: Book = await Book.findOrFail(record.id);

    await Database.transaction(async (trx) => {
      book.useTransaction(trx);

      book.merge({ ...record });

      await book.save();
    });
    return book;
  }

  public async searchByUser(record: Record<string, any>): Promise<ModelObject> {
    return await Book.query()
      .where('user_id', record.user_id)
      .preload('user')
      .orderBy('start_date', 'desc')
      .paginate(record.page, record.limit);
  }

  public async searchByBook(record: Record<string, any>): Promise<ModelObject> {
    return await Book.query().where('id', record.book_id).orderBy('id', 'desc').paginate(record.page, record.limit);
  }

  public async search(query?: any): Promise<{ meta?: any; data: ModelObject[] }> {
    return this.dataAccessService.search(query);
  }

  public async delete(id: number): Promise<Object> {
    try {
      return await Database.from('users_books').where('id', id).delete();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
