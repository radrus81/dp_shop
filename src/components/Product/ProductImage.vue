<template>
  <div class="item__pics pics">
    <div class="pics__wrapper">
      <img width="570" height="570" :src="currentImage" :alt="productData.title" />
    </div>
    <ul class="pics__list">
      <li class="pics__item" v-for="data in productData.colors" :key="data.id">
        <a
          @click.prevent="() => selectImage(data.gallery.img)"
          class="pics__link"
          :class="{'pics__link--current': currentImage === data.gallery.img}"
        >
          <img
            width="98"
            height="98"
            :src="data.gallery.img"
            :alt="product.title"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { URL_NO_IMAGE } from '@/constants';

export default {
  props: ['product'],
  setup(props) {
    const productData = computed(() => {
      const newColors = props.product.colors.map((color) => ({
        ...color,
        gallery: {
          img: color.gallery ? color.gallery[0].file.url : URL_NO_IMAGE,
        },
      }));

      return ({
        ...props.product,
        colors: newColors,
      });
    });

    const currentImage = ref(productData.value.colors[0].gallery.img);

    const selectImage = (url) => {
      currentImage.value = url;
    };

    return {
      productData,
      currentImage,
      URL_NO_IMAGE,
      selectImage,
    };
  },
};
</script>

<style lang="css" scoped>
  .pics__link{
    cursor: pointer;
  }

</style>
