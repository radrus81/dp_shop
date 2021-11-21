<template>
  <aside class="filter">
    <form class="filter__form form" method="get">
     <the-price></the-price>
     <the-category :key="keyValue"></the-category>
     <the-material :key="keyValue"></the-material>
     <the-seasons :key="keyValue"></the-seasons>

      <button
        class="filter__submit button button--primery"
        type="submit"
        @click.prevent="startFilters"
        >Применить</button>
      <button
      class="filter__reset button button--second"
      type="button"
      @click.prevent="resetFilters"
      >Сбросить</button>
    </form>
  </aside>
</template>

<script>
import { useStore } from 'vuex';
import { uniqueId } from 'lodash';
import ThePrice from './ThePrice.vue';
import TheCategory from './TheCategory.vue';
import TheMaterial from './TheMaterial.vue';
import TheSeasons from './TheSeasons.vue';

export default {
  props: ['keyValue'],
  components: {
    ThePrice, TheCategory, TheMaterial, TheSeasons,
  },

  setup() {
    const $store = useStore();

    const startFilters = () => {
      $store.commit('setStartFilter', uniqueId());
    };

    const resetFilters = () => {
      $store.commit('resetFilters', uniqueId());
    };

    return {
      startFilters,
      resetFilters,
    };
  },
};
</script>
