<template>
  <div>
    <BookEditTemplate :book_invalid="bookInvalid" />
    <Toast />
  </div>
</template>

<script>
import Vue from 'vue';
import { book } from '@/store';

export default Vue.extend({
  data() {
    return {
      isLoading: true,
      bookInvalid: false,
    };
  },

  computed: {
    getBook() {
      if (this.$route.params && this.$route.params.id)
        return parseInt(this.$route.params.id);
      return 0;
    },
  },

  async mounted() {
    await this.bookExists();
  },

  methods: {
    async bookExists() {
      this.$set(this, 'isLoading', true);

      const response = await book.getBook({ page: 1, limit: 999, book_id: this.getBook });
      if (
        (response.body && response.body.code !== 'SEARCH_SUCCESS') ||
        (response.body &&
          response.body.result &&
          response.body.result.data &&
          response.body.result.data.length === 0)
      ) {
        this.$set(this, 'bookInvalid', true);
      } else {
        this.$set(this, 'bookInvalid', false);
      }

      this.$set(this, 'isLoading', false);
    },
  },
});
</script>
