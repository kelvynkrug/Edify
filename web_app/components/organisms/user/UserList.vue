<template>
  <div>
    <v-data-table
      v-if="!$vuetify.breakpoint.smAndDown"
      :headers="getHeaders"
      :items="getUserList"
      :options.sync="options"
      :server-items-length="total"
      :footer-props="footerProps"
      :search="search"
      :loading="isLoadingGrid"
      hide-default-footer
      no-data-text="Nenhum usuário encontrado"
      loading-text="Carregando Lista de Usuários..."
      fixed-header
      dense
      height="80vh">
      <template #item.id="{ item }">
        {{ item.id }}
      </template>

      <template #item.name="{ item }">
        {{ item.name }}
      </template>

      <template #item.is_active="{ item }">
        {{ item.is_active ? 'Ativo' : 'Inativo' }}
      </template>

      <template #item.actions="{ item }">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn icon color="gray" @click="userEdit(item.id)">
              <v-icon v-bind="attrs" class="mt-0" v-on="on"> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <br />

    <div v-if="$vuetify.breakpoint.smAndDown && $isLoading" class="text-center">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <div v-if="$vuetify.breakpoint.smAndDown && !$isLoading">
      <v-row v-for="(item, idx) in getUserList" :key="idx" align-items="center">
        <v-col cols="12">
          <v-card elevation="5" outlined shaped tile>
            <v-card-title>
              <span>{{ item.id }}</span>
            </v-card-title>

            <v-card-text class="pb-1 pt-1">
              <span class="headerInfo"> Nome: </span>
              <span class="bodyInfo">{{ item.name }} </span>
            </v-card-text>

            <v-card-text class="pb-1 pt-1">
              <span class="headerInfo"> Email: </span>
              <span class="bodyInfo">{{ item.email }} </span>
            </v-card-text>

            <v-card-text class="pb-1 pt-1">
              <span class="headerInfo"> Status: </span>
              <span class="bodyInfo">{{ item.is_active ? `Ativo` : `Inativo` }} </span>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow pa-2">
                <span class="headerInfo pa-0 ma-0"> Ações: </span>
                <v-row align-items="center" justify="end">
                  <v-icon
                    class="cursor-pointer icon-mobile mt-0 pr-6 mt-0"
                    size="30"
                    @click="userEdit(item.id)"
                    >mdi-pencil
                  </v-icon>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
        <br />
      </v-row>
      <br /><br /><br />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { user, filter, loading } from '@/store';

export default Vue.extend({
  data() {
    return {
      search: '',
      isLoadingGrid: true,
      options: {},
      total: 0,
      userData: [],
      dialog: false,
      dialogDelete: false,
      footerProps: {
        'items-per-page-options': [10, 25, 50, 100],
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Registros por Página',
      },
      itemId: null,
    };
  },

  computed: {
    $isLoading() {
      return loading.$isLoading;
    },

    getUserId(): number {
      return this.$cookies.get('user_id');
    },

    getHeaders(): Object[] {
      return [
        { text: 'Id', value: 'id', width: '5rem' },
        { text: 'Nome', value: 'name', width: '10rem' },
        { text: 'Email', value: 'email', width: '10rem' },
        { text: 'Status', value: 'is_active', width: '5rem' },
        { text: 'Ação', value: 'actions', sortable: false, width: '5rem' },
      ];
    },

    getUserList() {
      let listFiltered = this.userData;

      if (this.hasFilter) {
        filter.$filters.user.forEach((filter) => {
          if (filter.selected.length) {
            listFiltered = listFiltered.filter((item) => {
              if (typeof item[filter.type] === 'object') {
                return filter.selected.includes(item[filter.type].id);
              } else {
                return item[filter.type].some((option) =>
                  filter.selected.includes(option.id)
                );
              }
            });
          }
        });
      }

      return listFiltered;
    },
  },

  async mounted() {
    await this.getUsers();

    this.resetUser();
  },

  methods: {
    countOccurrences(arr1, arr2) {
      const occurrences = {};

      for (const obj1 of arr1) {
        const { user_id } = obj1;

        for (const obj2 of arr2) {
          const { id } = obj2;

          if (user_id === id) {
            if (occurrences[id]) {
              occurrences[id]++;
            } else {
              occurrences[id] = 1;
            }
          }
        }
      }

      const result = Object.entries(occurrences).map(([id, count]) => ({
        id: parseInt(id),
        count,
      }));

      for (const obj2 of arr2) {
        const { id } = obj2;

        if (!occurrences[id]) {
          result.push({ id, count: 0 });
        }
      }

      return result;
    },

    resetUser(this: any): void {
      user.reset();
    },

    async getUsers(this: any) {
      const startTime = new Date().getTime();
      this.isLoadingGrid = true;
      loading.setIsLoading(true);

      const { sortBy, sortDesc } = this.options;

      const sorByText = sortBy;

      let response: any = {};

      if (!this.$vuetify.breakpoint.smAndDown) {
        response = await user.getUsers({
          page: 1,
          limit: 999,
          search: this.search,
          sortBy: sorByText.length ? sorByText : 'name',
          sortDesc: sortDesc[0],
        });
      } else {
        response = await user.getUsers({
          page: 1,
          limit: 999,
          search: this.search,
          sortBy: 'id',
          sortDesc: false,
        });
      }

      this.$set(this, 'userData', []);

      if (response.code === 'SEARCH_SUCCESS') {
        const data = response.data;

        data.forEach((item, idx) => {
          this.userData.push({
            ...item,
            class: idx % 2 === 0 ? '' : 'bg-gray',
          });
        });

        const elapsedTime = new Date().getTime() - startTime;
        const timeoutDuration = Math.max(1500 - elapsedTime, 0);

        setTimeout(() => {
          this.total = response.total;
          loading.setIsLoading(false);
          this.$set(this, 'isLoadingGrid', false);
        }, timeoutDuration);
      } else {
        loading.setIsLoading(false);
        this.$set(this, 'isLoadingGrid', false);
      }
    },

    userEdit(this: any, id: number): void {
      this.$router.replace('/user/edit/' + id);
    },
  },
});
</script>
