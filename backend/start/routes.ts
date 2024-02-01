import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  // LOGIN
  Route.post('/login', 'v1/LoginController.login');
  Route.get('/logout', 'v1/LoginController.logout');

  // USERS
  Route.get('/users', 'v1/UserController.search');
  Route.get('/user/:id', 'v1/UserController.find');
  Route.post('/user', 'v1/UserController.create');
  Route.patch('/user', 'v1/UserController.update');

  // BOOKS
  Route.post('/book', 'v1/BookController.create');
  Route.patch('/book', 'v1/BookController.update');
  Route.delete('/book/:id', 'v1/BookController.delete');
  Route.get('/books/:page/:limit/:user_id', 'v1/BookController.searchByUser');
  Route.get('/book/:page/:limit/:book_id', 'v1/BookController.searchByBook');
})
  .prefix('v1')
  .middleware(['authApiKey']);
