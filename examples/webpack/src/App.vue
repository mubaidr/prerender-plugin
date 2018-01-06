<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="(item, index) in essential" :key="index">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li v-for="(item, index) in ecosystem" :key="index">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        essential: [
          {
            title: 'Core Docs',
            link: 'https://vuejs.org'
          },
          {
            title: 'Forum',
            link: 'https://forum.vuejs.org'
          },
          {
            title: 'Community Chat',
            link: 'https://chat.vuejs.org'
          },
          {
            title: 'Twitter',
            link: 'https://twitter.com/vuejs'
          }
        ],
        ecosystem: [
          {
            title: 'vue-router',
            link: 'http://router.vuejs.org/'
          },
          {
            title: 'vuex',
            link: 'http://vuex.vuejs.org/'
          },
          {
            title: 'vue-loader',
            link: 'http://vue-loader.vuejs.org/'
          },
          {
            title: 'awesome-vue',
            link: 'https://github.com/vuejs/awesome-vue'
          }
        ]
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
