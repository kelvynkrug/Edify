<template>
  <div
    v-if="!$vuetify.breakpoint.mdAndDown"
    height="50%"
    class="cursor-pointer"
    @click="$_miniVariant = !$_miniVariant">
    <MiniLogo height="32px" />
  </div>

  <div
    v-else
    height="50%"
    class="cursor-pointer"
    @click="($_drawer = !$_drawer), ($_miniVariant = false)">
    <v-icon> mdi-menu </v-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
    $_miniVariant: {
      get(this: any): boolean {
        return this.mini_variant;
      },
      set(val): void {
        this.$emit('change-mini-variant', val);
      },
    },
    $_drawer: {
      get(this: any): boolean {
        return this.drawer;
      },
      set(val): void {
        this.$emit('change-drawer', val);
      },
    },
  },
});
</script>
