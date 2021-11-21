<template>
  <app-spinner v-if="isLoading"></app-spinner>
  <app-alert v-else-if="isLoadingError"></app-alert>
  <ul v-if="productsData.items && productsData.items.length" class="catalog__list">
      <product-item
        v-for="product in productsData.items"
        :key="product.id"
        :product="product">
      </product-item>
  </ul>
  <app-alert v-else>Нет данных</app-alert>
</template>

<script>

import {
  defineComponent,
} from 'vue';

import ProductItem from './ProductItem.vue';

export default defineComponent({
  props: ['productsData', 'isLoading', 'isLoadingError'],
  components: { ProductItem },

});
</script>
