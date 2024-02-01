<template>
  <v-menu bottom offset-y>
    <template #activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <v-avatar color="blue-grey" size="32">
          <div class="white--text">{{ getInitials(getUsername) }}</div>
        </v-avatar>
      </span>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title
          class="account-menu-items cursor-pointer"
          @click="userEdit(getUserId)">
          <v-icon> mdi-account </v-icon>
          {{ getUsername }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="account-menu-items cursor-pointer" @click="onLogout">
          <v-icon> mdi-logout </v-icon>
          Sair
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { auth } from '@/store';

export default Vue.extend({
  computed: {
    getUsername() {
      return this.$cookies.get('username');
    },

    getPhoto() {
      return '';
    },

    getUserId(): number {
      return this.$cookies.get('user_id');
    },
  },

  methods: {
    userEdit(this: any, id: number): void {
      this.$router.replace('/user/edit/' + id);
    },

    getInitials(name) {
      const names = name.split(' ');
      const firstInitial = names[0][0];
      const lastInitial = names[names.length - 1][0];
      return firstInitial + lastInitial;
    },

    async onLogout() {
      await auth.destroy();

      this.$router.replace('/login');
    },
  },
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

v::deep.theme--light.v-icon {
  color: var(--black) !important;
}
</style>
