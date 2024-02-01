<template>
  <div>
    <PageTitle />

    <div v-if="user_invalid || !valid">
      <ValueNoExists text="Usuário não encontrado" />

      <v-col cols="12" class="text-center">
        <v-btn text class="btn btn-success-secondary" @click="back"> Voltar </v-btn>
      </v-col>
    </div>

    <div v-else>
      <Loading v-if="isLoading" class="mt-5" />
      <User v-else :user_id="user_id" is-editing />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/prop-name-casing */
import Vue from 'vue';

export default Vue.extend({
  props: {
    user_invalid: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      valid: true,
      isLoading: false,
    };
  },

  computed: {
    $bookId() {
      return this.$cookies.get('book_id');
    },

    $systemAdmin() {
      return this.$cookies.get('is_system_admin');
    },
  },

  mounted() {
    this.$set(this, 'isLoading', true);

    this.$set(this, 'isLoading', false);
  },

  methods: {
    back() {
      this.$router.replace('/user');
    },
  },
});
</script>
