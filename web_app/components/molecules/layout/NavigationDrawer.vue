<template>
  <v-navigation-drawer v-model="$_drawer" :mini-variant="$_miniVariant" clipped app>
    <v-list>
      <div v-for="(item, i) in getSidebar" :key="i">
        <v-tooltip v-if="$_miniVariant" right>
          <template #activator="{ on, attrs }">
            <v-list-item :to="item.to" router exact>
              <v-list-item-action class="text-center">
                <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title> {{ item.title }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span> {{ item.title }} </span>
        </v-tooltip>

        <v-list-item v-if="!$_miniVariant" :to="item.to" router exact>
          <v-list-item-action class="text-center">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue';
import { sidebar } from '@/utils/menu-sidebar';

export default Vue.extend({
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    mini_variant: {
      type: Boolean,
      default: false,
    },
    drawer: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getSidebar() {
      return sidebar;
    },

    getUsername() {
      return this.$cookies.get('username');
    },

    $_miniVariant: {
      get() {
        return this.mini_variant;
      },
      set(val) {
        this.$emit('change-mini-variant', val);
      },
    },

    $_drawer: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit('change-drawer', val);
      },
    },
  },

  methods: {},
});
</script>

<style scoped>
.text-support {
  color: white;
}
</style>
