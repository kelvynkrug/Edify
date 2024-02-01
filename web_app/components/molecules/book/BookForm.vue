<template>
  <v-form ref="form" v-model="valid" class="pb-3" @submit.prevent="validate">
    <v-row v-if="!$isLoading" class="pl-5 pt-5 pr-5">
      <v-col class="pr-1" cols="12" md="12">
        <v-autocomplete
          v-model="book"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Nome do Livro"
          return-object />
      </v-col>

      <v-col class="pr-1 text-center" cols="12" md="12">
        <img
          v-if="!$book.thumbnail || ($book.thumbnail && $book.thumbnail !== '')"
          :src="$book.thumbnail" />

        <img v-else src="../../../assets/images/default_thumb.jpeg" />
        <br />
      </v-col>

      <v-col class="pr-1 text-center" cols="12" md="12">
        <v-rating
          v-model="$book.rate"
          required
          :readonly="!$book.title"
          length="5"
          size="30"
          color="#4218b5"
          background-color="grey lighten-1" />
      </v-col>

      <v-col class="pr-1" cols="12" md="6">
        <v-text-field
          v-model="$book.author"
          :disabled="!$book.title"
          :rules="[validationRequired]"
          label="Autor"
          dense
          outlined
          type="text"
          required
          hide-details="auto" />
      </v-col>

      <v-col class="pr-1" cols="12" md="6">
        <v-text-field
          v-model="$book.pages"
          :disabled="!$book.title"
          :rules="[validationRequired]"
          label="Páginas"
          dense
          outlined
          type="text"
          required
          hide-details="auto" />
      </v-col>

      <v-col class="pr-1" cols="12" md="6">
        <v-menu
          ref="menu"
          v-model="menu.start_date"
          :disabled="!$book.title"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          bottom
          min-width="auto">
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="formatDateBr($book.start_date)"
              :disabled="!$book.title"
              :rules="[validationRequired]"
              label="Comecei a ler"
              v-bind="attrs"
              dense
              outlined
              append-icon="mdi-calendar"
              hide-details="auto"
              v-on="on"
              @input="menu.start_date = false"
              @click:append="menu.start_date = true" />
          </template>

          <v-date-picker
            :value="formatDateUs($book.start_date)"
            locale="pt-br"
            no-title
            @input="($event) => ($book.start_date = $event)" />
        </v-menu>
      </v-col>

      <v-col class="pr-1" cols="12" md="6">
        <v-menu
          ref="menu"
          v-model="menu.end_date"
          :disabled="!$book.title"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          bottom
          min-width="auto">
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="formatDateBr($book.end_date)"
              :disabled="!$book.title"
              label="Terminei de ler"
              v-bind="attrs"
              dense
              outlined
              append-icon="mdi-calendar"
              hide-details="auto"
              v-on="on"
              @input="menu.end_date = false"
              @click:append="menu.end_date = true" />
          </template>

          <v-date-picker
            :value="formatDateUs($book.end_date)"
            locale="pt-br"
            no-title
            @input="($event) => ($book.end_date = $event)" />
        </v-menu>
      </v-col>

      <v-col class="pr-1" cols="12" md="12">
        <v-textarea
          v-model="$book.review"
          :disabled="!$book.title"
          label="Resenha"
          dense
          row-height="4"
          rows="4"
          outlined />
      </v-col>
    </v-row>

    <div v-if="!$isLoading" class="mt-5 text-center">
      <v-btn text class="btn btn-success-secondary" @click="back"> Voltar </v-btn>

      <v-btn text class="btn btn-success-primary" @click="validate">
        {{ isEditing ? 'Salvar' : 'Cadastrar' }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import Vue from 'vue';
import { book, loading, toast } from '@/store';
import { formatDateToUs, formatDateToBr } from '~/utils/formatters';

export default Vue.extend({
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    valid: true,
    menu: {
      start_date: false,
      end_date: false,
    },
    entries: [],
    isLoading: false,
    book: null,
    search: null,
  }),

  computed: {
    $book() {
      return book.$book;
    },

    $isLoading() {
      return loading.$isLoading;
    },

    getUserId() {
      return this.$cookies.get('user_id');
    },

    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a',
        };
      });
    },
    items() {
      return this.entries && this.entries.length
        ? this.entries.map((entry) => {
            const Description = entry.volumeInfo.title;

            return Object.assign({}, entry, { Description });
          })
        : [];
    },
  },

  watch: {
    search(val) {
      if (val && val.length < 4) {
        return;
      }

      this.isLoading = true;

      fetch(`https://www.googleapis.com/books/v1/volumes?q=${val}`)
        .then((res) => res.json())
        .then((res) => {
          const { totalItems, items } = res;
          this.count = totalItems;
          this.entries = items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },

    book(val) {
      if (val) {
        book.$book.title =
          val.volumeInfo && val.volumeInfo.title ? val.volumeInfo.title : '';
        book.$book.author =
          val.volumeInfo && val.volumeInfo.authors && val.volumeInfo.authors.length
            ? val.volumeInfo.authors[0]
            : '';
        book.$book.pages =
          val.volumeInfo && val.volumeInfo.pageCount ? val.volumeInfo.pageCount : 0;
        book.$book.thumbnail =
          val.volumeInfo &&
          val.volumeInfo.imageLinks &&
          val.volumeInfo.imageLinks.thumbnail
            ? val.volumeInfo.imageLinks.thumbnail
            : '';
        book.$book.small_thumbnail =
          val.volumeInfo &&
          val.volumeInfo.imageLinks &&
          val.volumeInfo.imageLinks.smallThumbnail
            ? val.volumeInfo.imageLinks.smallThumbnail
            : '';
      }
    },
  },

  methods: {
    formatDateBr(date) {
      return formatDateToBr(date);
    },

    formatDateUs(date) {
      return formatDateToUs(date);
    },

    back() {
      this.$router.replace('/book');

      setTimeout(() => {
        this.resetBook();
      }, 800);
    },

    validate() {
      this.$refs.form.validate();
      if (this.valid) this.isEditing ? this.onUpdate() : this.onCreate();
      else {
        toast.setToast({
          text: 'Existem campos obrigatórios',
          type: 'danger',
          time: 3000,
        });
      }
    },

    async onCreate() {
      book.$book.user_id = this.getUserId;

      const response = await book.create(book.$book);

      if (response.body && response.body.code === 'CREATE_SUCCESS') {
        toast.setToast({
          text: 'Livro cadastrado com sucesso!',
          type: 'success',
          time: 2000,
        });

        this.back();
      } else {
        toast.setToast({
          text: 'Ocorreu um erro ao cadastarar o Livro',
          type: 'danger',
          time: 3000,
        });
      }
    },

    async onUpdate() {
      const response = await book.update();

      if (response.body && response.body.code === 'UPDATE_SUCCESS') {
        toast.setToast({
          text: 'Livro atualizado com sucesso!',
          type: 'success',
          time: 2000,
        });
      } else {
        toast.setToast({
          text: 'Ocorreu um erro ao atualizar o Livro',
          type: 'danger',
          time: 3000,
        });
      }
    },

    validationRequired(value) {
      if (value && value.length === 0) {
        return 'Campo Obrigatório.';
      }
      return !!value || 'Campo Obrigatório.';
    },

    resetBook() {
      book.reset();
    },
  },
});
</script>
