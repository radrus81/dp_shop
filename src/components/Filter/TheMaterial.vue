<template>
  <the-template
    title="Материал"
    :isLoading="isLoading"
    :isLoadingError="isLoadingError"
    :items="$store.getters.storeMaterials"
    :selectedIds="$store.getters.storeMaterialIds"
    :onHandler="setSelectedMaterials"
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
      items: materials,
      isLoading,
      isLoadingError,
      loadItems: loadMaterials,
      selectItem: selectMaterials,
    } = useFilter('/api/materials');

    const setSelectedMaterials = (event, id) => {
      $store.commit('setMaterialId', selectMaterials(event, id));
    };

    watch(materials, (data) => {
      $store.commit('setMaterials', data.items);
    });

    watch(() => $store.getters.storeMaterials, (data) => {
      if (!data.length) {
        loadMaterials();
      }
    }, { immediate: true });

    return {
      isLoading,
      isLoadingError,
      setSelectedMaterials,
    };
  },
});
</script>

<style></style>
