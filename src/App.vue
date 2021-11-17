<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <app-header></app-header>
    <router-view/>
  <app-footer></app-footer>

</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: { AppHeader, AppFooter },
};
</script>

<style>

</style>
