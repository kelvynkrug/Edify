<template>
  <div class="background">
    <Loading v-if="loading" />

    <v-form v-else ref="form" v-model="valid" class="pb-3" @submit.prevent="validate">
      <UserForm :is-editing="isEditing" />
      <div class="mt-5 text-center">
        <v-btn text class="btn btn-success-secondary" @click="back"> Voltar </v-btn>

        <v-btn text class="btn btn-success-primary" @click="validate">
          {{ isEditing ? 'Salvar' : 'Cadastrar' }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { user, toast } from '~/store';

export default Vue.extend({
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },

    // eslint-disable-next-line vue/prop-name-casing
    user_id: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    loading: false,
    valid: true,
  }),

  async created() {
    if (this.isEditing) {
      await this.getUser();
    } else {
      this.resetUser();
    }
  },

  methods: {
    back() {
      this.$router.replace('/user');

      setTimeout(() => {
        this.resetUser();
      }, 800);
    },

    resetUser() {
      user.reset();
    },

    async getUser() {
      await user.get(this.user_id);
    },

    validate() {
      this.$refs.form.validate();

      if (this.valid) this.isEditing ? this.onUpdate() : this.onCreate();
      else {
        toast.setToast({
          text: 'Existem campos obrigatórios',
          type: 'danger',
          time: 3000,
        });
      }
    },

    async onCreate() {
      const response = await user.create(user.$user);

      if (response.body && response.body.code === 'CREATE_SUCCESS') {
        toast.setToast({
          text: 'Usuário cadastrado com sucesso!',
          type: 'success',
          time: 2000,
        });
      } else {
        toast.setToast({
          text: 'Ocorreu um erro ao cadastrar o Usuário',
          type: 'danger',
          time: 3000,
        });
      }

      this.back();
    },

    async onUpdate() {
      this.$set(this, 'loading', true);

      const response = await user.update();

      if (response.body.code === 'UPDATE_SUCCESS') {
        toast.setToast({
          text: 'Usuário atualizado com sucesso!',
          type: 'success',
          time: 2000,
        });
      } else {
        toast.setToast({
          text: 'Ocorreu um erro ao atualizar o Usuário',
          type: 'danger',
          time: 3000,
        });
      }

      this.back();
      this.$set(this, 'loading', false);
    },
  },
});
</script>

<style lang="scss" scoped>
.background {
  background-color: var(--white);
}
.container {
  padding: 2rem;
  background-color: var(--white);
  border-radius: 4px;
}
</style>
