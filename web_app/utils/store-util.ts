/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import Auth from '@/store/auth';
import Toast from '@/store/toast';
import Filter from '@/store/filter';
import Book from '~/store/book';
import User from '@/store/user';
import Loading from '@/store/loading';

let auth: Auth;
let toast: Toast;
let filter: Filter;
let book: Book;
let user: User;
let loading: Loading;

const initializeStores = (store: Store<any>) => {
  auth = getModule(Auth, store);
  toast = getModule(Toast, store);
  filter = getModule(Filter, store);
  book = getModule(Book, store);
  user = getModule(User, store);
  loading = getModule(Loading, store);
};

export { initializeStores, auth, toast, filter, book, loading, user };
