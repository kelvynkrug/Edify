/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import { $axios, $cookies } from '@/utils/nuxt-instance';

import { SearchPayload } from '@/models';

import { auth } from '~/store';

interface CreatePayload {
  name: String;
  email: String;
  password: String;
  is_active?: Boolean;
}

@Module({ name: 'user', stateFactory: true, namespaced: true })
export default class Payterm extends VuexModule {
  private user: any = {
    id: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    is_active: true,
  };

  private copyUser: any = {
    id: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    is_active: true,
  };

  private userList = [];

  public get $user() {
    return this.user;
  }

  public get $userList() {
    return this.userList;
  }

  @Mutation
  private SET_USER(payload: any) {
    this.user = payload;
    this.copyUser = { ...this.user };
  }

  @Mutation
  private SET_USER_LIST(data: any) {
    this.userList = data.map((item: any) => ({
      value: item.id,
      text: item.name,
    }));
  }

  @Mutation
  private RESET() {
    this.user = {
      id: undefined,
      name: undefined,
      email: undefined,
      password: undefined,
      is_active: true,
    };
    this.copyUser = { ...this.user };
  }

  @Action
  public async create(payload: CreatePayload) {
    return await $axios
      .$post('user', payload)
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
    const payload: any = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      is_active: this.user.is_active,
    };

    if (this.user.password !== this.copyUser.password) {
      payload.password = this.user.password;
    }

    return await $axios
      .$patch('user', payload)
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
  public async get(user_id: number) {
    return await $axios
      .$get(`users?where[id][v]=${user_id}`)
      .then((response) => {
        if (response.body && response.body.code !== 'SEARCH_SUCCESS')
          throw new Error(response);

        this.context.commit('SET_USER', response.body.result.data[0]);
        return response;
      })
      .catch(() => {
        return {
          data: 'Error',
          code: 'FIND_NOTFOUND',
          total: 0,
        };
      });
  }

  @Action
  public async getUsers({ page, limit, search, sortBy, sortDesc }: SearchPayload) {
    let filter = '';
    let filter2 = '';

    filter += page ? `page=${page}&` : '';
    filter += limit ? `limit=${limit}&` : '';

    if (search) {
      const newString = encodeURIComponent(`${search}`);
      filter2 += `&search[name][o]=_LIKE_&search[name][v]=${newString}&search[email][o]=_LIKE_&search[email][v]=${newString}`;
    }

    const status = await $axios
      .$get(`users?${filter}${filter2}&orderBy[]=${sortBy}:${sortDesc ? 'desc' : 'asc'}`)
      .then((response) => {
        if (response.body && response.body.code !== 'SEARCH_SUCCESS')
          throw new Error(response);

        this.context.commit('SET_USER_LIST', response.body.result.data);

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
  public reset() {
    this.context.commit('RESET');
  }
}
