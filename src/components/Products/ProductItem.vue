<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="image" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>
    <color-list
      :productId="product.id"
      :colors="product.colors"
      @new-image="image=$event"
      ></color-list>

  </li>
</template>

<script>
import { ref } from 'vue';
import ColorList from './ColorList.vue';

export default {
  props: ['product'],
  components: { ColorList },
  setup(props) {
    const imageUrl = props.product.colors[0].gallery
      ? props.product.colors[0].gallery[0].file.url
      : 'https://etk23.ru/image/cache/10836_1-800x800.jpeg';
    const image = ref(imageUrl);
    return {
      image,
    };
  },
};
</script>

<style></style>
