<template>
  <NuxtLink :to="url">
    <v-btn
      v-if="!$vuetify.breakpoint.smAndDown"
      class="mx-2 add-button"
      large
      fixed
      bottom
      right
      color="primary">
      <v-icon color="white">mdi-plus</v-icon>
      &nbsp; <span class="text-add-button">{{ text }}</span>
    </v-btn>
    <v-btn v-else class="mx-2 add-button" large fixed bottom right color="primary">
      <v-icon color="white">mdi-plus</v-icon>
      &nbsp; <span class="text-add-button">{{ text }}</span>
    </v-btn>
  </NuxtLink>
</template>

<script lang="ts">
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
  },
};
</script>
