<script setup lang="ts">
import ProblemGrid from "./components/problem-grid.vue";
</script>

<template>
  <problem-grid></problem-grid>
</template>

<style lang="scss">
body {
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  background: #222;

  div.explosion-container {
    margin: auto;
  }
}
</style>
