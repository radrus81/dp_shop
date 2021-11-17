<template>
  <app-spinner v-if="isLoading"></app-spinner>
  <the-alert v-else-if="isLoadingError"></the-alert>
  <ul v-if="productsData" class="catalog__list">
      <product-item
        v-for="product in productsData.items"
        :key="product.id"
        :product="product">
      </product-item>
  </ul>
  <div v-else> Нет данных</div>
</template>

<script>

import {
  defineComponent, ref,
} from 'vue';
import { useStore } from 'vuex';

import TheAlert from '../UI/TheAlert.vue';
import ProductItem from './ProductItem.vue';
import useFilter from '@/hooks/useFilter';

export default defineComponent({
  components: { ProductItem, TheAlert },
  setup() {
    const $store = useStore();

    const page = ref(1);
    const limit = ref(9);

    const params = {
      params: {
        page: page.value,
        limit: limit.value,
      },
    };

    const {
      items: productsData,
      isLoading,
      isLoadingError,
      loadItems: loadProducts,
    } = useFilter('/api/products', params);

    loadProducts();

    // почему то здесь undefined, очень интересно почему
    // хотя в шаблоне все выводится
    console.log('productsData', productsData.value.pagination);

    // $store.commit('setPage', productsData.pagination.page);
    $store.commit('setPaginationData', productsData.value);

    return {
      productsData,
      isLoading,
      isLoadingError,
    };
  },
});
</script>
