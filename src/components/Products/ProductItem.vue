<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <a class="catalog__pic" href="#">
        <img :src="image" :alt="product.title" />
      </a>
    </router-link>
    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>
    <span class="catalog__price"> {{ product.price }} ₽ </span>
    <color-list
      :productId="product.id"
      :colors="product.colors"
      @new-image="image = $event"
    ></color-list>
  </li>
</template>

<script>
import { ref } from 'vue';
import ColorList from './ColorList.vue';
import { URL_NO_IMAGE } from '@/constants';

export default {
  props: ['product'],
  components: { ColorList },
  setup(props) {
    const imageUrl = props.product.colors[0].gallery
      ? props.product.colors[0].gallery[0].file.url
      : URL_NO_IMAGE;
    const image = ref(imageUrl);
    return {
      image,
    };
  },
};
</script>

<style></style>
