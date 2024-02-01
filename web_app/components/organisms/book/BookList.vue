<template>
  <div>
    <v-data-table
      v-if="!$vuetify.breakpoint.smAndDown"
      :headers="getHeaders"
      :items="getBookList"
      :options.sync="options"
      :server-items-length="total"
      :footer-props="footerProps"
      :search="search"
      :loading="isLoadingGrid"
      :items-per-page="100"
      no-data-text="Nenhum Livro encontrado"
      loading-text="Carregando Lista de Livros..."
      fixed-header
      dense
      height="80vh">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.id="{ index }">
        {{ index + 1 }}
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.start_date="{ item }">
        {{ item.start_date ? formatDateBr(item.start_date) : '-' }}
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.end_date="{ item }">
        {{ item.end_date ? formatDateBr(item.end_date) : '-' }}
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.rate="{ item }">
        {{ item.rate ? item.rate : 'Sem avaliação' }}
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions="{ item }">
        <v-row>
          <v-col cols="4" md="3">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn icon color="gray" @click="bookEdit(item.id)">
                  <v-icon v-bind="attrs" v-on="on"> mdi-pencil </v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
            </v-tooltip>
          </v-col>
          <v-col cols="4" md="3">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn icon color="gray" @click="bookDelete(item.id)">
                  <v-icon v-bind="attrs" v-on="on"> mdi-close-thick </v-icon>
                </v-btn>
              </template>
              <span>Excluir</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
    </v-data-table>

    <br />

    <div v-if="$vuetify.breakpoint.smAndDown && $isLoading" class="text-center">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <div v-if="$vuetify.breakpoint.smAndDown && !$isLoading">
      <v-row v-for="(item, idx) in getBookList" :key="idx" align-items="center">
        <v-col cols="12">
          <v-card elevation="5" outlined shaped tile>
            <v-card-title>
              <v-row>
                <v-col cols="8">
                  <span>{{ idx + 1 }}</span>
                </v-col>
                <!-- <v-col v-if="item.wppBriefingLink" cols="4" class="text-right">
                  <v-icon :color="getRobotData(item.wppBriefingLink)">mdi-circle</v-icon>
                </v-col> -->
              </v-row>
            </v-card-title>

            <v-row>
              <v-col cols="7">
                <v-card-text class="pb-1 pt-1">
                  <span class="headerInfo"> Nome: </span>
                  <span class="bodyInfo">{{ item.title }} </span>
                </v-card-text>

                <v-card-text class="pb-1 pt-1">
                  <span class="headerInfo"> Autor: </span>
                  <span class="bodyInfo">{{ item.author }} </span>
                </v-card-text>

                <v-card-text class="pb-1 pt-1">
                  <span class="headerInfo"> Páginas: </span>
                  <span class="bodyInfo">{{ item.pages }} </span>
                </v-card-text>

                <v-card-text class="pb-1 pt-1">
                  <span class="headerInfo"> Início Leitura: </span>
                  <span class="bodyInfo">
                    {{ item.start_date ? formatDateBr(item.start_date) : '-' }}
                  </span>
                </v-card-text>

                <v-card-text class="pb-1 pt-1">
                  <span class="headerInfo"> Fim Leitura: </span>
                  <span class="bodyInfo">
                    {{ item.end_date ? formatDateBr(item.end_date) : '-' }}
                  </span>
                </v-card-text>

                <v-card-text class="pb-1 pt-1">
                  <span class="headerInfo"> Avaliação </span>
                  <span class="bodyInfo">
                    {{ item.rate ? item.rate : 'Sem avaliação' }}
                  </span>
                </v-card-text>
              </v-col>
              <v-col cols="5">
                <img :src="item.small_thumbnail" />
              </v-col>
            </v-row>

            <v-card-actions>
              <v-list-item class="grow pa-2">
                <span class="headerInfo pa-0 ma-0"> Ações: </span>
                <v-row align-items="center" justify="end">
                  <v-icon
                    class="cursor-pointer icon-mobile pr-12"
                    size="30"
                    @click="bookEdit(item.id)"
                    >mdi-pencil
                  </v-icon>
                  <v-icon
                    class="cursor-pointer icon-mobile pr-5"
                    size="30"
                    @click="bookDelete(item.id)"
                    >mdi-close-thick
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
import { sleep } from '@/utils/utils';
import { filter, book, toast, loading } from '@/store';
import { formatDateToUs, formatDateToBr } from '~/utils/formatters';

export default Vue.extend({
  data() {
    return {
      search: '',
      isLoadingGrid: true,
      options: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 100,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
      },
      total: 0,
      bookData: [],
      dialog: false,
      dialogDelete: false,
      footerProps: {
        'items-per-page-options': [100, 200, 500, 1000, 2000, 5000],
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

    getHeaders(): Object[] {
      return [
        { text: 'ID', value: 'id', width: '5rem' },
        { text: 'Nome', value: 'title', width: '20rem' },
        { text: 'Autor', value: 'author', width: '5rem' },
        { text: 'Páginas', value: 'pages', width: '5rem' },
        { text: 'Início Leitura', value: 'start_date', width: '5rem' },
        { text: 'Fim Leitura', value: 'end_date', width: '5rem' },
        { text: 'Avaliação', value: 'rate', width: '5rem' },
        { text: 'Ações', value: 'actions', sortable: false, width: '7rem' },
      ];
    },

    getUserId() {
      return this.$cookies.get('user_id');
    },

    getBookList() {
      let listFiltered = this.bookData;

      if (this.hasFilter) {
        filter.$filters.book.forEach((filter) => {
          if (filter.selected.length) {
            listFiltered = listFiltered.filter((item) =>
              item[filter.type].some((option) => filter.selected.includes(option.id))
            );
          }
        });
      }

      return listFiltered;
    },
  },

  async mounted() {
    await sleep(500);

    this.getBooks();
  },

  created() {
    this.resetBook();
  },

  methods: {
    formatDateBr(date) {
      return formatDateToBr(date);
    },

    formatDateUs(date) {
      return formatDateToUs(date);
    },

    resetBook(this: any): void {
      book.reset();
    },

    async getBooks(this: any) {
      const startTime = new Date().getTime();
      this.isLoadingGrid = true;
      loading.setIsLoading(true);

      const { page } = this.options;

      let response: any = {};

      response = await book.get({ page, limit: 999, user_id: this.getUserId });

      this.$set(this, 'bookData', []);

      if (response && response.body && response.body.code === 'SEARCH_SUCCESS') {
        const data = response.body.result.data;

        this.bookData = data;

        const elapsedTime = new Date().getTime() - startTime;
        const timeoutDuration = Math.max(1500 - elapsedTime, 0);

        setTimeout(() => {
          this.total = response.body.result.meta.total;
          loading.setIsLoading(false);
          this.$set(this, 'isLoadingGrid', false);
        }, timeoutDuration);
      } else {
        loading.setIsLoading(false);
        this.$set(this, 'isLoadingGrid', false);
      }
    },

    debounced(this: any) {
      clearTimeout(this._timer);

      this._timer = setTimeout(() => {
        this.getBooks();
      }, 500);
    },

    bookEdit(this: any, id: number): void {
      this.$router.replace('/book/edit/' + id);
    },

    async bookDelete(this: any, id: number) {
      const response = await book.delete(id);

      if (response.body && response.body.code === 'DELETE_SUCCESS') {
        toast.setToast({
          text: 'Livro deletado com sucesso!',
          type: 'success',
          time: 2000,
        });
      } else {
        toast.setToast({
          text: 'Ocorreu um erro ao deletar o Livro',
          type: 'danger',
          time: 3000,
        });
      }

      await this.getBooks();
    },
  },
});
</script>

<style scoped>
.v-btn:before {
  background-color: transparent !important;
}
</style>
