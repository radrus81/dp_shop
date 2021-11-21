<template>
  <the-template
    title="Коллекция"
    :isLoading="isLoading"
    :isLoadingError="isLoadingError"
    :items="$store.getters.storeSeasons"
    :selectedIds="$store.getters.storeSeasonIds"
    :onHandler="setSelectedSeasons"
  ></the-template>
</template>

<script>
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';

import TheTemplate from './TheTemplate.vue';

import useFilter from '@/hooks/useFilter';

export default defineComponent({
  components: { TheTemplate },
  setup() {
    const $store = useStore();

    const {
      items: seasons,
      isLoading,
      isLoadingError,
      loadItems: loadSeasons,
      selectItem: selectSeasons,
    } = useFilter('/api/seasons');

    const setSelectedSeasons = (event, id) => {
      $store.commit('setSeasonsId', selectSeasons(event, id));
    };

    watch(seasons, (data) => {
      $store.commit('setSeasons', data.items);
    });

    watch(() => $store.getters.storeSeasons, (data) => {
      if (!data.length) {
        loadSeasons();
      }
    }, { immediate: true });

    return {
      isLoading,
      isLoadingError,
      setSelectedSeasons,
    };
  },
});
</script>
