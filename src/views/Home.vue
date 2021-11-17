<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <the-filter></the-filter>
      <section class="catalog">
      <product-list></product-list>
      <the-pagination></the-pagination>
      </section>
    </div>
  </main>
</template>

<script>

import {
  defineComponent,
} from 'vue';

import TheFilter from '@/components/Filter/TheFilter.vue';
import ProductList from '@/components/Products/ProductList.vue';
import ThePagination from '@/components/Pagination/ThePagination.vue';

export default defineComponent({
  name: 'Home',
  components: { TheFilter, ThePagination, ProductList },

});
</script>
