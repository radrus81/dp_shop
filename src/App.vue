<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  {{test}}
  <app-header></app-header>
  <router-view :key="$route.fullPath" />
  <app-footer></app-footer>
  <teleport to="body">
    <vue3-snackbar bottom center :duration="4000"></vue3-snackbar>
  </teleport>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: { AppHeader, AppFooter },

  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  computed: {
    snackbar() {
      return this.$store.getters.storeTypeMessage;
    },
  },

  watch: {
    snackbar(newVal) {
      this.$snackbar.add({
        type: newVal.type,
        text: newVal.text,
      });
      setTimeout(() => {
        this.$store.commit('setTypeMessage', {
          type: '',
          message: '',
        });
      }, 4000);
    },
  },

  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),

  },
};
</script>

<style></style>
