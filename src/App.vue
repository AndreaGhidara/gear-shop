<script setup>
import FooterComponent from './components/FooterComponent.vue'
import { RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue';
</script>

<template>
  <header class="w-100 position-sticky top-0 z-3">
    <Navbar />
  </header>
  <RouterView />
  <footer class="py-3 my-4 border-top">
    <FooterComponent />
  </footer>
</template>

<style scoped>
header {
  width: 100vw;
}
</style>
