import User from '@/pages/user/index.vue';
import Create from '@/pages/user/create.vue';
import Edit from '@/pages/user/edit.vue';

export default [
  {
    path: '/user',
    component: User,
    name: 'Usuários',
    meta: {
      name: 'user',
      screenName: 'Usuários',
    },
  },
  {
    path: '/user/create',
    component: Create,
    name: 'Cadastro de Usuário',
    meta: {
      name: 'create',
      screenName: 'Cadastro',
    },
  },
  {
    path: '/user/edit/:id',
    component: Edit,
    name: 'Edição de Usuário',
    meta: {
      name: 'edit',
      screenName: 'Edição',
    },
  },
];
