import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import User from './User';

export default class Users_Books extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: 'user_id' })
  public user_id: number;

  @column()
  public title: string;

  @column()
  public author: string;

  @column()
  public pages: number;

  @column()
  public start_date: string;

  @column()
  public end_date: string;

  @column()
  public rate: string;

  @column()
  public review: string;

  @column()
  public small_thumbnail: string;

  @column()
  public thumbnail: string;

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: 'updated_at',
  })
  public updatedAt: DateTime;
}
