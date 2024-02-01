<template>
  <div>
    <div class="text-center">
      <Title text="Gerenciador de Livros" class="mt-4"> </Title>
    </div>
    <br />
    <br />

    <v-row>
      <span class="ml-5">
        Olá! <span class="cl-blue bold"> Seja bem-vindo(a), {{ getUsername }}! </span>

        Estou pronto para contribuir com sua rotina! <br /><br />
        Meu objetivo inicial é atender você,
        <span class="cl-blue bold"> leitor ávido</span>. <br />
        Se você está lendo este texto, é porque você já pode contar comigo para
        transformar sua experiência de leitura. <br />
        <br />

        Qualquer dificuldade que encontre ou tiver uma dúvida/sugestão para me dar, é
        fácil, basta entrar em contato com meu time através do e-mail:
        <a href="mailto:suporte@edify.com.br">suporte@edify.com.br</a>
        <br /><br />
        Conto com sua <span class="cl-blue bold"> cooperação </span> para me auxiliar a
        aprender mais sobre seus hábitos de leitura e assim eu possa aprimorar minhas
        funcionalidades. <br />
        Vamos descobrir novos livros, acompanhar suas metas de leitura, e conectar com uma
        comunidade de
        <span class="cl-blue bold"> leitores apaixonados.</span> <br />

        Alcançaremos o melhor resultado, de forma
        <span class="cl-blue bold"> ágil </span> e
        <span class="cl-blue bold"> assertiva </span>
        em sua jornada pelo mundo dos livros.
      </span>
    </v-row>

    <v-row> </v-row>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },

  computed: {
    getUsername() {
      return this.$cookies.get('username');
    },
  },

  async mounted() {},

  methods: {
    padZero(numero, tamanho = 2) {
      let numeroString = String(numero);
      while (numeroString.length < tamanho) {
        numeroString = '0' + numeroString;
      }
      return numeroString;
    },

    getFusoHorario(data) {
      const offset = data.getTimezoneOffset();
      const sinal = offset < 0 ? '+' : '-';
      const horas = this.padZero(Math.floor(Math.abs(offset) / 60));
      const minutos = this.padZero(Math.abs(offset) % 60);
      return `${sinal}${horas}:${minutos}`;
    },
  },
});
</script>
