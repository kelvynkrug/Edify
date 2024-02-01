<template>
  <v-app>
    <v-app-bar color="white" clipped-left dense fixed app>
      <MenuLogo
        :mini_variant="miniVariant"
        :drawer="drawer"
        @change-mini-variant="changeMiniVariant"
        @change-drawer="changeDrawer" />

      <v-spacer />

      <AccountMenu />
    </v-app-bar>

    <NavigationDrawer
      :mini_variant="miniVariant"
      :drawer="drawer"
      @change-mini-variant="changeMiniVariant"
      @change-drawer="changeDrawer" />

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LayoutDefault',
  middleware: 'auth',

  data() {
    return {
      drawer: false,
      miniVariant: true,
    };
  },

  mounted() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.$set(this, 'drawer', false);
      this.$set(this, 'miniVariant', true);
    } else {
      this.$set(this, 'drawer', true);
      this.$set(this, 'miniVariant', true);
    }
  },

  methods: {
    changeMiniVariant(value: Boolean) {
      this.$set(this, 'miniVariant', value);
    },

    changeDrawer(value: Boolean) {
      this.$set(this, 'drawer', value);
    },
  },
});
</script>

<style scoped lang="scss">
::v-deep {
  .theme--light.v-icon {
    color: var(--primary);
  }
}
</style>
