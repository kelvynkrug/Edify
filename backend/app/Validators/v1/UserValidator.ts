import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ReportHandler from './Reporters/ReportHandler';

class CreateUserValidator {
  constructor(protected context: HttpContextContract) {}

  public reporter = ReportHandler;

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string(),
    is_active: schema.boolean(),
  });

  public messages = {};
}

class UpdateUserValidator {
  constructor(protected context: HttpContextContract) {}

  public reporter = ReportHandler;

  public schema = schema.create({
    id: schema.number(),
    name: schema.string.optional(),
    email: schema.string.optional({}, [rules.email()]),
    password: schema.string.optional(),
    is_active: schema.boolean.optional(),
  });

  public messages = {};
}

export { CreateUserValidator, UpdateUserValidator };
