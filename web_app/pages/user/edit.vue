<template>
  <div>
    <Loading v-if="$isLoading" class="mt-5" />

    <UserEditTemplate v-else :user_invalid="userInvalid" :user_id="getUser" />
    <Toast />
  </div>
</template>

<script>
import Vue from 'vue';
import { user, loading } from '@/store';

export default Vue.extend({
  data() {
    return {
      isLoading: true,
      userInvalid: false,
    };
  },

  computed: {
    $isLoading() {
      return loading.$isLoading;
    },

    getUser() {
      if (this.$route.params && this.$route.params.id)
        return parseInt(this.$route.params.id);
      return 0;
    },
  },

  async mounted() {
    await this.userExists();
  },

  methods: {
    async userExists() {
      const startTime = new Date().getTime();
      loading.setIsLoading(true);

      const response = await user.get(this.getUser);
      if (
        (response.body && response.body.code !== 'SEARCH_SUCCESS') ||
        (response.body &&
          response.body.result &&
          response.body.result.data &&
          response.body.result.data.length === 0)
      ) {
        this.$set(this, 'userInvalid', true);
      } else {
        this.$set(this, 'userInvalid', false);
      }

      const elapsedTime = new Date().getTime() - startTime;
      const timeoutDuration = Math.max(1500 - elapsedTime, 0);

      setTimeout(() => {
        loading.setIsLoading(false);
      }, timeoutDuration);
    },
  },
});
</script>
