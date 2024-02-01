import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ReportHandler from './Reporters/ReportHandler';

class CreateBookValidator {
  constructor(protected context: HttpContextContract) {}

  public reporter = ReportHandler;

  public schema = schema.create({
    user_id: schema.number(),
    title: schema.string(),
    author: schema.string(),
    pages: schema.number(),
    start_date: schema.string.optional(),
    end_date: schema.string.optional(),
    rate: schema.number.optional(),
    review: schema.string.optional(),
    small_thumbnail: schema.string(),
    thumbnail: schema.string(),
  });

  public messages = {};
}

class UpdateBookValidator {
  constructor(protected context: HttpContextContract) {}

  public reporter = ReportHandler;

  public schema = schema.create({
    id: schema.number(),
    start_date: schema.string.optional(),
    end_date: schema.string.optional(),
    rate: schema.number.optional(),
    review: schema.string.optional(),
  });

  public messages = {};
}

export { CreateBookValidator, UpdateBookValidator, DeleteBookValidator };
