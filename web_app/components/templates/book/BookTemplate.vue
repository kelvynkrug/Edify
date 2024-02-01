<template>
  <div>
    <PageTitle />

    <BookList />

    <AddButton url="/book/create" text="Adicionar Livro" />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  computed: {},
});
</script>
