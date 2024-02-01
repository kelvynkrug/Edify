<template>
  <div class="login-container">
    <Logo :class="!$vuetify.breakpoint.smAndDown ? 'logo' : 'logoMobile'" />

    <v-form
      ref="form"
      v-model="valid"
      class="login-form text-center mt-4"
      @submit.prevent="validate"
      @keyup.native.enter="validate">
      <v-alert
        v-if="error"
        dense
        outlined
        type="error"
        icon="mdi-alert-outline"
        transition="scale-transition">
        E-mail ou senha inválidos.
      </v-alert>

      <LoginForm v-if="!$isLoading" />

      <v-progress-linear v-if="$isLoading" indeterminate color="primary">
      </v-progress-linear>

      <v-btn v-if="!$isLoading" class="buttonBase mt-6" @click="validate"> Entrar </v-btn>

      <v-btn v-if="$isLoading" class="buttonBase mt-10">
        <v-progress-circular indeterminate color="white" />
        &nbsp;Entrando
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { auth, loading } from '~/store';

export default Vue.extend({
  name: 'LoginOrganisms',

  data() {
    return {
      valid: true,
      error: false,
    };
  },

  computed: {
    $isLoading() {
      return loading.$isLoading;
    },
  },

  methods: {
    async onLogin() {
      try {
        const startTime = new Date().getTime();
        loading.setIsLoading(true);

        const res = await auth.login(auth.$credentials);

        if (res.code !== 'LOGIN_SUCCESS') {
          setTimeout(() => {
            this.$set(this, 'error', true);
            loading.setIsLoading(false);
          }, 2000);
        } else {
          this.$set(this, 'error', false);

          const elapsedTime = new Date().getTime() - startTime;
          const timeoutDuration = Math.max(1500 - elapsedTime, 0);

          setTimeout(() => {
            loading.setIsLoading(false);
            this.$router.replace('/');
          }, timeoutDuration);
        }
      } catch (error) {
        loading.setIsLoading(false);
        auth.setError();
      }
    },

    async validate(this: any) {
      await this.$refs.form.validate();

      if (this.valid) await this.onLogin();
    },
  },
});
</script>

<style scoped>
.login-form {
  width: 100%;
}

.login-container {
  background: var(--background-two);
  padding: 24px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  left: 0;
  right: 0;
}

.logo {
  margin-top: -80px;
  width: 80%;
}

.logoMobile {
  width: 80%;
  margin-top: -220px;
}
.forgotPassword {
  color: var(--primary);
  font-size: 14px;
  cursor: pointer;
}

.buttonBase {
  text-transform: none !important;
  text-decoration: none !important;
  letter-spacing: normal !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  background-color: var(--primary) !important;
  color: var(--white) !important;
  border-radius: 8px !important;
  width: 100% !important;
  height: 40px !important;
}

.buttonBase:hover {
  background-color: var(--secondary) !important;
  transition: 0.3s ease-in-out;
}

.v-btn--is-elevated,
.v-btn--is-elevated:after {
  box-shadow: none !important;
}
</style>
