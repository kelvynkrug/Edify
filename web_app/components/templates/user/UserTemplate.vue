<template>
  <div>
    <PageTitle />

    <UserList />

    <AddButton url="/user/create" text="Criar Usuário" />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  computed: {},
});
</script>
