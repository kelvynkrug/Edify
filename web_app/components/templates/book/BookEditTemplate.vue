<template>
  <div>
    <PageTitle />

    <div v-if="book_invalid">
      <ValueNoExists text="Livro não encontrado" />

      <v-col cols="12" class="text-center">
        <v-btn text class="btn btn-success-secondary" @click="back"> Voltar </v-btn>
      </v-col>
    </div>

    <Book v-else is-editing />
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/prop-name-casing */
import Vue from 'vue';

export default Vue.extend({
  props: {
    book_invalid: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    back() {
      this.$router.replace('/book');
    },
  },
});
</script>
