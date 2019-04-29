<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header /> <br />
    <Aframe> </Aframe>
    <router-view />
  </div>
</template>

<script>
import Header from './components/header/navbar.vue';
import Aframe from './components/VR/aframe.vue';

export default {
  name: 'Myapp',
  components: {
    Header,
    Aframe,
  },
  data() {
    return {};
  },
};
</script>
<style lang="stylus">

// #app
//   font-family 'Avenir', Helvetica, Arial, sans-serif
//   -webkit-font-smoothing antialiased
//   -moz-osx-font-smoothing grayscale
//   // text-align center
//   color #2c3e50
//
// #nav
//   padding 30px
//   a
//     font-weight bold
//     color #2c3e50
//     &.router-link-exact-active
//       color #42b983
</style>
