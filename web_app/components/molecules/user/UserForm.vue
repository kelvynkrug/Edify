<template>
  <div>
    <v-row class="pa-5">
      <v-col class="pr-1" cols="12" md="4">
        <v-text-field
          v-model="$user.name"
          :rules="[validationRequired]"
          label="Nome Completo*"
          dense
          outlined
          type="text"
          hide-details="auto" />
      </v-col>

      <v-col class="pr-1" cols="12" md="3">
        <v-text-field
          v-model="$user.email"
          :rules="[validationEmail]"
          label="E-mail*"
          dense
          outlined
          type="email"
          hide-details="auto" />
      </v-col>

      <v-col class="pr-1" cols="12" md="3">
        <v-text-field
          v-model="$user.password"
          :rules="!isEditing ? [validationRequired] : []"
          label="Senha*"
          dense
          outlined
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          hide-details="auto"
          @click:append="showPassword = !showPassword" />
      </v-col>

      <v-col cols="12" md="2">
        <v-switch v-model="$user.is_active" label="Status" inset hide-details />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import { user } from '@/store';

export default Vue.extend({
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    valid: true,
    showPassword: false,
  }),

  computed: {
    $user() {
      return user.$user;
    },
  },

  methods: {
    validationRequired(value) {
      if ((value && value.length === 0) || value === 0) {
        return 'Campo Obrigatório.';
      }
      return !!value || 'Campo Obrigatório.';
    },

    validationEmail(value) {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailRegex.test(value)) {
        return 'O formato do e-mail não é válido.';
      }
      return !!value || 'O formato do e-mail não é válido.';
    },
  },
});
</script>

<style scoped lang="scss">
::v-deep {
  .v-input--selection-controls {
    margin-top: 0px !important;
  }
}
</style>
