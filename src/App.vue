<template>
  <div id="app">
    <SpinnerComponent :start="spin.value" />
    <SpaceXComponent />
  </div>
</template>

<script>
import SpinnerComponent from './components/SpinnerComponent.vue';
import SpaceXComponent from './components/SpaceXComponent.vue'

export default {
  name: 'App',
  components: {
    SpinnerComponent,
    SpaceXComponent
  },
  data() {
    return {
      spin: {
        value: false,
      },
    };
  },
  provide() {
    return {
      makeSpin: this.spin,
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
