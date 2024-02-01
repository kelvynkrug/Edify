import Book from '@/pages/book/index.vue';
import Create from '@/pages/book/create.vue';
import Edit from '@/pages/book/edit.vue';

export default [
  {
    path: '/book',
    component: Book,
    name: 'Livros',
    meta: {
      name: 'book',
      screenName: 'Livros',
    },
  },
  {
    path: '/book/create',
    component: Create,
    name: 'Cadastro de Livros',
    meta: {
      name: 'create',
      screenName: 'Cadastro',
    },
  },
  {
    path: '/book/edit/:id',
    component: Edit,
    name: 'Edição de Livros',
    meta: {
      name: 'edit',
      screenName: 'Edição',
    },
  },
];
