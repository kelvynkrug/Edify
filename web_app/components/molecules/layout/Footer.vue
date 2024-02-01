<template>
  <v-footer absolute app>
    <span>
      <a :href="$patchNotes" target="_blank" style="text-decoration: none">
        {{ $version }}
      </a>
      &copy; {{ new Date().getFullYear() }}
    </span>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    $version() {
      return process.env.version;
    },
    $patchNotes() {
      return process.env.path_notes_url;
    },
  },
});
</script>
