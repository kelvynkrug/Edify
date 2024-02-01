/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'filter',
  stateFactory: true,
  namespaced: true,
})
export default class Filter extends VuexModule {
  private filters: any = {
    book: [
      {
        text: 'Título',
        selected: [],
        items: [],
      },
    ],
    user: [
      {
        text: 'Usuário',
        selected: [],
        items: [],
      },
    ],
  };

  public get $filters() {
    return this.filters;
  }

  @Mutation
  private MOUNT_FILTERS(filters) {
    this.filters[filters.type] = filters.items;
  }

  @Mutation
  private RESET() {
    this.filters.book.forEach((filter) => {
      filter.selected = [];
    });
  }

  @Action
  public mountFilters(filters) {
    this.context.commit('MOUNT_FILTERS', filters);
  }

  @Action
  public reset() {
    this.context.commit('RESET');
  }
}
