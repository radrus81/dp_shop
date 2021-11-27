<template>
  <main class="content container">
    <app-spinner v-if="isLoading"></app-spinner>
    <app-alert v-else-if="isLoadingError" :message="errorMessage">
    </app-alert>
    <div v-else>
      <div class="content__top">
        <app-breadcrumbs
          :dataBreadcrumbs="dataBreadcrumbs"
        ></app-breadcrumbs>
      </div>
      <section class="item">
        <product-image v-if="product.id" :product="product"></product-image>
        <div class="item__info">
          <span class="item__code">Артикул: {{product.id}}</span>
          <h2 class="item__title">{{product.title}}</h2>
          <div class="item__form">
            <product-form :product="product"></product-form>
          </div>
        </div>

        <product-info></product-info>
        </section>
    </div>

  </main>
</template>

<script>
import {
  computed,
  defineComponent,
} from 'vue';
import { useRoute } from 'vue-router';

import AppBreadcrumbs from '@/components/UI/AppBreadcrumbs.vue';
import ProductImage from '@/components/Product/ProductImage.vue';
import ProductForm from '@/components/Product/ProductForm.vue';
import ProductInfo from '@/components/Product/ProductInfo.vue';

import useFilter from '@/hooks/useFilter';

export default defineComponent({
  components: {
    AppBreadcrumbs, ProductImage, ProductForm, ProductInfo,
  },

  setup() {
    const $route = useRoute();

    const {
      items: product,
      isLoading,
      isLoadingError,
      loadItems: loadProduct,
      error,
    } = useFilter(`/api/products/${$route.params.id}`);

    loadProduct();

    const errorMessage = computed(() => error.value.error.message);
    const dataBreadcrumbs = computed(() => ([
      {
        id: product.value.category.id,
        title: product.value.category.title,
        url: 'home',
      },
      {
        id: product.value.id,
        title: product.value.title,
      },
    ]));

    return {
      product,
      isLoading,
      isLoadingError,
      errorMessage,
      dataBreadcrumbs,
    };
  },
});
</script>
