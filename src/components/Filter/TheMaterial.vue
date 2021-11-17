<template>
  <the-template
    title="Материал"
    :isLoading="isLoading"
    :isLoadingError="isLoadingError"
    :items="materials.items"
    :onHandler="setSelectedMaterials"
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
      items: materials,
      selectedIds: selectedMaterialsIds,
      isLoading,
      isLoadingError,
      loadItems: loadMaterials,
      selectItem: selectMaterials,
    } = useFilter('/api/materials/');

    const setSelectedMaterials = (event, id) => {
      $store.commit('setMaterialId', selectMaterials(event, id));
    };

    loadMaterials();

    return {
      materials,
      selectedMaterialsIds,
      isLoading,
      isLoadingError,
      setSelectedMaterials,
    };
  },
});
</script>

<style></style>
