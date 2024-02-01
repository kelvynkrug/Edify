import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ReportHandler from './Reporters/ReportHandler';

export default class LoginValidator {
  constructor(protected context: HttpContextContract) {}

  public reporter = ReportHandler;

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    rememberMe: schema.boolean.optional(),
    password: schema.string(),
  });

  public messages = {};
}
