import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserService from 'App/Services/v1/UserService';
import QueryModelValidator from 'App/Validators/v1/QueryModelValidator';
import { CreateUserValidator, UpdateUserValidator } from 'App/Validators/v1/UserValidator';
import utils from 'Utils/utils';

export default class UserController {
  private userService: UserService = new UserService();

  public async create(context: HttpContextContract) {
    const payload = await context.request.validate(CreateUserValidator);

    const result = await this.userService.create(payload);

    const headers = utils.getHeaders();

    const body = utils.getBody('CREATE_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async update(context: HttpContextContract) {
    const payload = await context.request.validate(UpdateUserValidator);

    const result = await this.userService.update(payload);

    const headers = utils.getHeaders();

    const body = utils.getBody('UPDATE_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }

  public async search(context: HttpContextContract) {
    const payload = await context.request.validate(QueryModelValidator);

    const result = await this.userService.search(payload);

    const headers = utils.getHeaders();

    const body = utils.getBody('SEARCH_SUCCESS', result);

    context.response.status(200).send({ body, headers });
  }
}
