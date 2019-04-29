<template>
  <div class="home">
    <Aframe></Aframe>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Aframe from '@/components/VR/aframe.vue';

export default {
  name: 'home',
  components: {
    Aframe,
  },
};
</script>
