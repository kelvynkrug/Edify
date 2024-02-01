import Hash from '@ioc:Adonis/Core/Hash';
import { DateTime } from 'luxon';
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Book from './Book';

export default class User extends BaseModel {
  public static connection = 'pg';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public is_active: boolean;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true, serializeAs: 'created_at' })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: 'updated_at',
  })
  public updatedAt: DateTime;

  @hasMany(() => Book, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public books: HasMany<typeof Book>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
