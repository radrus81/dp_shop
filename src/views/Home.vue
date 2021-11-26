<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ total}} товар(а) </span>
      </div>
    </div>

    <div class="content__catalog" >
      <products-filter :keyValue="uniqueIdPage"></products-filter>
      <section class="catalog">
      <product-list
        :productsData="productsData"
        :isLoading="isLoading"
        :isLoadingError="isLoadingError"
        ></product-list>
      <app-pagination
        :key="uniqueIdPage"
        :currentPage="page"
        :pages="pages"
        :paginate="paginate"></app-pagination>
      </section>
    </div>
  </main>
</template>

<script>

import {
  defineComponent,
  reactive,
  ref,
  watch,
} from 'vue';
import { uniqueId } from 'lodash';
import { useStore } from 'vuex';

import useFilter from '@/hooks/useFilter';

import ProductsFilter from '@/components/Filter/ProductsFilter.vue';
import ProductList from '@/components/Products/ProductList.vue';
import AppPagination from '@/components/Pagination/AppPagination.vue';

export default defineComponent({
  name: 'Home',
  components: { ProductsFilter, AppPagination, ProductList },

  setup() {
    const $store = useStore();

    const uniqueIdPage = ref(uniqueId('page_'));
    const page = ref(1);
    const limit = ref(6);
    const total = ref(0);
    const pages = ref(1);

    const {
      items: productsData,
      isLoading,
      isLoadingError,
      loadItems: loadProducts,
    } = useFilter('/api/products');

    watch([page, () => $store.getters.storeStartFilter], (newValues, oldValues) => {
      const filterParams = reactive({
        minPrice: $store.getters.storeMinPrice,
        maxPrice: $store.getters.storeMaxPrice,
        categoryId: $store.getters.storeCategoryId,
        materialIds: $store.getters.storeMaterialIds,
        seasonIds: $store.getters.storeSeasonIds,
      });
      const params = {
        params: {
          ...filterParams,
          page: newValues[1] === oldValues[1] ? page.value : 1,
          limit: limit.value,
        },
      };
      loadProducts(params);
    }, { immediate: true });

    watch([productsData, () => $store.getters.storeStartFilter], (newValues) => {
      page.value = newValues[0].pagination.page || 1;
      pages.value = newValues[0].pagination.pages || 1;
      total.value = newValues[0].pagination.total;
      uniqueIdPage.value = uniqueId('page_');
    });

    const paginate = (selecedPage) => {
      page.value = selecedPage;
      uniqueIdPage.value = uniqueId('page_');
    };

    return {
      uniqueIdPage,
      page,
      pages,
      total,
      productsData,
      isLoading,
      isLoadingError,
      paginate,
    };
  },

});
</script>
