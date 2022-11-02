<template>
    <the-header></the-header>
    <the-navbar></the-navbar>
    <the-body></the-body>
</template>

<script>
  import TheHeader from './components/layout/TheHeader.vue'
  import TheNavbar from './components/layout/TheNavbar.vue'
  import TheBody from './components/layout/TheBody.vue'
export default {
  name: 'App',
  components: {
    TheHeader, TheNavbar, TheBody
  }
}
</script>

<style>
@import url(./css/main.css);
</style>
