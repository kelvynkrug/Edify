import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/Access/User';

export default class ProfessionSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      { name: 'Admin', email: 'admin@gmail.com', password: 'admin123', is_active: true },
      { name: 'Kelvyn Krug', email: 'kelvynkrug@gmail.com', password: 'admin123', is_active: true },
      { name: 'Fabiano F', email: 'fabiano@gmail.com', password: 'admin123', is_active: true },
    ]);
  }
}
