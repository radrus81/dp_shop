<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <app-spinner v-if="isLoading"></app-spinner>
    <app-alert v-else-if="isLoadingError"></app-alert>
    <label v-else class="form__label form__label--select">
      <select class="form__select" name="category" v-model.number="currentCategoryId">
        <option :selected="!currentCategoryId && true" :value="0">
          Все категории
        </option>
        <option
          :value="category.id"
          v-for="category in $store.getters.storeCategories"
          :key="category.id"
          :selected="currentCategoryId === category.id && true"
        >
          {{ category.title }}
        </option>
      </select>
    </label>
  </fieldset>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import useFilter from '@/hooks/useFilter';

export default defineComponent({
  setup() {
    const $store = useStore();

    const {
      items: categories,
      isLoading,
      isLoadingError,
      loadItems: loadCategories,
    } = useFilter('/api/productCategories');

    const currentCategoryId = ref($store.getters.storeCategoryId);

    watch(currentCategoryId, (categoryId) => {
      $store.commit('setCategoryId', categoryId);
    });

    watch(categories, (data) => {
      $store.commit('setCategories', data.items);
    });

    watch(() => $store.getters.storeCategories, (data) => {
      if (!data.length) {
        loadCategories();
      }
    }, { immediate: true });

    return {
      currentCategoryId,
      isLoading,
      isLoadingError,
    };
  },

});
</script>
