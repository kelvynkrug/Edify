<template>
  <div>
    <div v-if="!$isLoading" class="background">
      <BookForm :is-editing="isEditing" />
    </div>

    <Lottie v-else path="./animations/loading.json" height="300" width="300" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { book, loading } from '~/store';

export default Vue.extend({
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    loading: false,
  }),

  computed: {
    $isLoading() {
      return loading.$isLoading;
    },
  },

  async created() {
    if (this.isEditing) {
      await this.getBook();
    } else {
      this.resetBook();
    }
  },

  methods: {
    back() {
      this.$router.replace('/book');
    },

    getBook() {
      loading.setIsLoading(true);
      const startTime = new Date().getTime();

      const elapsedTime = new Date().getTime() - startTime;
      const timeoutDuration = Math.max(2000 - elapsedTime, 0);

      setTimeout(() => {
        loading.setIsLoading(false);
      }, timeoutDuration);
    },

    resetBook() {
      book.reset();
    },
  },
});
</script>

<style lang="scss" scoped>
.background {
  background-color: var(--white);
}
.container {
  padding: 2rem;
  background-color: var(--white);
  border-radius: 4px;
}
</style>
