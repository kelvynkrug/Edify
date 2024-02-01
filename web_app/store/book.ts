/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import { $axios } from '@/utils/nuxt-instance';

import { SearchPayload } from '@/models';

interface CreatePayload {
  user_id: Number;
  title: String;
  author: String;
  pages: Number;
  start_date?: String;
  end_date?: String;
  rate?: Number;
  review?: String;
  small_thumbail: String;
  thumbail: String;
}

@Module({
  name: 'book',
  stateFactory: true,
  namespaced: true,
})
export default class Book extends VuexModule {
  private book: any = {
    id: undefined,
    user_id: undefined,
    title: undefined,
    author: undefined,
    pages: undefined,
    start_date: undefined,
    end_date: undefined,
    rate: undefined,
    review: undefined,
    small_thumbail: undefined,
    thumbail: undefined,
  };

  private copyBook: any = {
    id: undefined,
    user_id: undefined,
    title: undefined,
    author: undefined,
    pages: undefined,
    start_date: undefined,
    end_date: undefined,
    rate: undefined,
    review: undefined,
    small_thumbail: undefined,
    thumbail: undefined,
  };

  private bookList = [];

  public get $book() {
    return this.book;
  }

  public get $bookList() {
    return this.bookList;
  }

  @Mutation
  private SET_BOOK(payload: any) {
    this.book = payload;
    this.copyBook = { ...this.book };
  }

  @Mutation
  private SET_BOOK_LIST(data: any) {
    this.bookList = data;
  }

  @Mutation
  private RESET() {
    this.book = {
      id: undefined,
      user_id: undefined,
      title: undefined,
      author: undefined,
      pages: undefined,
      start_date: undefined,
      end_date: undefined,
      rate: undefined,
      review: undefined,
      small_thumbail: undefined,
      thumbail: undefined,
    };

    this.copyBook = { ...this.book };
  }

  @Action
  public async create(payload: CreatePayload) {
    return await $axios
      .$post('book', payload)
      .then((response) => {
        if (response.body && response.body.code !== 'CREATE_SUCCESS')
          throw new Error(response);

        return response;
      })
      .catch(({ response }) => {
        return response;
      });
  }

  @Action
  public async update() {
    const payload = {
      id: this.book.id,
      start_date: this.book.start_date,
      end_date: this.book.end_date,
      rate: this.book.rate,
      review: this.book.review,
    } as unknown as {
      start_date?: String;
      end_date?: String;
      rate?: Number;
      revieew?: String;
    };

    return await $axios
      .$patch('book', payload)
      .then((response) => {
        if (response.body && response.body.code !== 'UPDATE_SUCCESS')
          throw new Error(response);
        return response;
      })
      .catch(({ response }) => {
        return response;
      });
  }

  @Action
  public async get({ page, limit, user_id }) {
    return await $axios
      .$get(`books/${page}/${limit}/${user_id}`)
      .then((response) => {
        if (response.body && response.body.code !== 'SEARCH_SUCCESS')
          throw new Error(response);

        this.context.commit('SET_BOOK_LIST', response.body.result.data);
        return response;
      })
      .catch(() => {
        return {
          data: 'Error',
          code: 'SEARCH_NOTFOUND',
          total: 0,
        };
      });
  }

  @Action
  public async getBook({ page, limit, book_id }) {
    return await $axios
      .$get(`book/${page}/${limit}/${book_id}`)
      .then((response) => {
        if (response.body && response.body.code !== 'SEARCH_SUCCESS')
          throw new Error(response);

        this.context.commit('SET_BOOK', response.body.result.data[0]);
        return response;
      })
      .catch(() => {
        return {
          data: 'Error',
          code: 'SEARCH_NOTFOUND',
          total: 0,
        };
      });
  }

  @Action
  public async getBooks({ page, limit, search, sortBy, sortDesc }: SearchPayload) {
    let filter = '';
    let filter2 = '';

    filter += page ? `page=${page}&` : '';
    filter += limit ? `limit=${limit}&` : '';

    if (search) {
      const newString = encodeURIComponent(`${search}`);
      filter2 += `&search[title][o]=_LIKE_&search[title][v]=${newString}`;
    }

    const status = await $axios
      .$get(
        `books?${filter}${filter2}&orderBy[]=${sortBy}:${
          sortDesc ? 'desc' : 'asc'
        }&preloads[]=user`
      )
      .then((response) => {
        if (response.body && response.body.code !== 'SEARCH_SUCCESS')
          throw new Error(response);

        return {
          data: response.body.result.data,
          code: response.body.code,
          total: response.body.result.meta.total,
        };
      })
      .catch(() => {
        return {
          data: 'Error',
          code: 'SEARCH_NOTFOUND',
          total: 0,
        };
      });
    return status;
  }

  @Action
  public async delete(book_id) {
    return await $axios
      .$delete(`book/${book_id}`)
      .then((response) => {
        if (response.body && response.body.code !== 'DELETE_SUCCESS')
          throw new Error(response);

        return response;
      })
      .catch(({ response }) => {
        return response;
      });
  }

  @Action
  public reset() {
    this.context.commit('RESET');
  }
}
