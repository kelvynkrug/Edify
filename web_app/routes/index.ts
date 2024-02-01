import Book from './book';
import User from './user';
import HomePage from '~/pages/home.vue';
import Login from '~/pages/login.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
  },
  ...Book,
  ...User,
];
