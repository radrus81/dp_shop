<template>
  <the-template
    title="Коллекция"
    :isLoading="isLoading"
    :isLoadingError="isLoadingError"
    :items="seasons.items"
    :onHandler="setSelectedSeasons"
  ></the-template>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import TheTemplate from './TheTemplate.vue';

import useFilter from '@/hooks/useFilter';

export default defineComponent({
  components: { TheTemplate },
  setup() {
    const $store = useStore();

    const {
      items: seasons,
      selectedIds: selectedSeasonsIds,
      isLoading,
      isLoadingError,
      loadItems: loadSeasons,
      selectItem: selectSeasons,
    } = useFilter('/api/seasons');

    const setSelectedSeasons = (event, id) => {
      $store.commit('setSeasonsId', selectSeasons(event, id));
    };

    loadSeasons();

    return {
      seasons,
      selectedSeasonsIds,
      isLoading,
      isLoadingError,
      setSelectedSeasons,
    };
  },
});
</script>
