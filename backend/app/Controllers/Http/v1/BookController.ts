import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BookService from 'App/Services/v1/BookService';
import QueryModelValidator from 'App/Validators/v1/QueryModelValidator';
import { CreateBookValidator, UpdateBookValidator } from 'App/Validators/v1/BookValidator';
import utils from 'Utils/utils';

export default class BookController {
  private bookService: BookService = new BookService();

  public async create(context: HttpContextContract) {
    const payload = await context.request.validate(CreateBookValidator);

    const result = await this.bookService.create(payload);

    const headers = utils.getHeaders();

    const body = utils.getBody('CREATE_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async update(context: HttpContextContract) {
    const payload = await context.request.validate(UpdateBookValidator);

    const result = await this.bookService.update(payload);

    const headers = utils.getHeaders();

    const body = utils.getBody('UPDATE_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async searchByUser(context: HttpContextContract) {
    const result = await this.bookService.searchByUser({
      page: context.request.param('page'),
      limit: context.request.param('limit'),
      user_id: context.request.param('user_id'),
    });

    const headers = utils.getHeaders();

    const body = utils.getBody('SEARCH_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async searchByBook(context: HttpContextContract) {
    const result = await this.bookService.searchByBook({
      page: context.request.param('page'),
      limit: context.request.param('limit'),
      book_id: context.request.param('book_id'),
    });

    const headers = utils.getHeaders();

    const body = utils.getBody('SEARCH_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async search(context: HttpContextContract) {
    const payload = await context.request.validate(QueryModelValidator);

    const result = await this.bookService.search(payload);

    const headers = utils.getHeaders();

    const body = utils.getBody('SEARCH_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async delete(context: HttpContextContract) {
    const result = await this.bookService.delete(context.request.param('id'));

    const headers = utils.getHeaders();

    const body = utils.getBody('DELETE_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }
}
