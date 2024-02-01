## 👨🏾‍💻 # Exercício Take-Home para candidatos a SDE (Edify Tech)

## 👨🏾‍💻 Tecnologias Utilizadas

<h3> Front-end </h3>

<ul>
  <li> Vue.js </li>
  <ul>
    <li> <a href="https://github.com/championswimmer/vuex-module-decorators"> Vuex-module-decorators </a> </li>
    <li> <a href="https://www.npmjs.com/package/lottie-vuejs"> Lottie Vue </a> </li>
  </ul>
  <li> Vuetify.js </li>
  <li> Nuxt.js </li>
  <ul>
    <li> <a href="https://go.nuxtjs.dev/axios"> Axios </a> </li>
    <li> <a href="https://github.com/nuxt-community/router-module"> Router </a> </li>
    <li> <a href="https://www.npmjs.com/package/cookie-universal-nuxt"> Cookie-Universal </a> </li>
    <li> <a href="https://www.npmjs.com/package/@nuxtjs/toast"> Toast </a> </li>
  </ul>
  <li> Typescript </li>
</ul>

<h3> Backend </h3>
<ul>
  <li> Node.js </li>
  <li> Adonis.js </li>
  <ul>
    <li> <a href="https://docs.adonisjs.com/guides/database/introduction"> Lucid ORM </a> </li>
    <li> <a href="https://docs.adonisjs.com/guides/views/introduction"> Views & Templates </a> </li>
  </ul>
  <li> Typescript </li>
</ul>

## Instalação e Execução

Siga estas etapas para instalar e executar a aplicação:

<h2> Node v16.19.0 </h2>

<h2> Banco de dados </h2>

```bash
$ docker-compose up
```

<h2> Configurações de Backend </h2>

```bash
# Vá para a pasta
$ cd backend

# Instale as dependencias
$ yarn install

# crie a estrutura do banco de dados
$ node ace migration:run
$ node ace db:seed

# rode em modo desenvolvimento
$ yarn dev
```

<h2> Configurações de Frontend </h2>

```bash
# Vá para a pasta
$ cd web_app

# Instale as dependencias
$ yarn install

# rode em modo desenvolvimento
$ yarn dev
```

<h2> Acessando a aplicação </h2>

Navegue para a Url: http://localhost:5252

<ul>
  <li> User 1 </li>
  <ul>
    <li> email: admin@gmail.com </li>
    <li> senha: admin123 </li>
  </ul>

  <li> User 2 </li>
  <ul>
    <li> email: kelvynkrug@gmail.com </li>
    <li> senha: admin123 </li>
  </ul>

  <li> User 3 </li>
  <ul>
    <li> email: fabiano@gmail.com </li>
    <li> senha: admin123 </li>
  </ul>
  
</ul>
