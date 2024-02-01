<template>
  <div class="text-center">
    <v-snackbar
      v-model="getToast.show"
      :color="getToast.toastType"
      :timeout="-1"
      :top="$route.fullPath === '/book' && $vuetify.breakpoint.mdAndDown"
      :bottom="!$vuetify.breakpoint.mdAndDown"
      :right="!$vuetify.breakpoint.mdAndDown"
      :centered="
        $vuetify.breakpoint.mdAndDown ||
        $route.fullPath === '/' ||
        $route.fullPath === '/welcome'
      ">
      <v-row :class="`toast-${getToast.toastType} toast`">
        <v-col cols="12" :class="`toast-${getToast.toastType} toast-title`">
          <strong>Notificação</strong>
          <v-spacer></v-spacer>
          <v-icon class="close-toast" @click="closeToast()"> mdi-close </v-icon>
        </v-col>
        <v-divider></v-divider>
        <div class="toast-body">
          {{ getToast.toastText }}
        </div>
        <div v-if="getToast.toastText2" class="toast-body">
          {{ getToast.toastText2 }}
        </div>
        <div v-if="getToast.toastText3" class="toast-body">
          {{ getToast.toastText3 }}
        </div>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { toast } from '@/store';

export default Vue.extend({
  computed: {
    getToast: () => toast.$single,
  },

  methods: {
    closeToast() {
      toast.closeToast();
    },
  },
});
</script>
