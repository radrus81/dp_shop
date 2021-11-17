<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <app-spinner v-if="isLoading"></app-spinner>
    <the-alert v-else-if="isLoadingError"></the-alert>
    <label
      v-else
      class="form__label form__label--select"
    >
      <select
        class="form__select"
        type="text"
        name="category"
        v-model.number="currentCategoryId"
      >
        <option :value="0">Все категории</option>
        <option
          :value="category.id"
          v-for="category in categories.items"
          :key="category.id"
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
import TheAlert from '../UI/TheAlert.vue';
import useFilter from '@/hooks/useFilter';

export default defineComponent({
  components: { TheAlert },
  setup() {
    const $store = useStore();

    const {
      items: categories,
      isLoading,
      isLoadingError,
      loadItems: loadCategories,
    } = useFilter('/api/productCategories');

    const currentCategoryId = ref(0);

    watch(currentCategoryId, (categoryId) => {
      $store.commit('setCategoryId', categoryId);
    });

    loadCategories();

    return {
      categories,
      currentCategoryId,
      isLoading,
      isLoadingError,
    };
  },
});
</script>
