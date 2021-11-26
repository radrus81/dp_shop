<template>
  <ul class="colors colors--black">
      <li class="colors__item" v-for="({color}) in colors" :key="color.id">

        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :name="productId"
            :value="color.id"
            :checked="color.id === idSelectedColor"
            v-model="idSelectedColor"
          />
          <span class="colors__value" :style="{ 'background-color': color.code }"> </span>
        </label>
      </li>
    </ul>
</template>

<script>
import {
  defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  props: ['colors', 'productId'],
  setup(props, context) {
    const idSelectedColor = ref(props.colors[0].color.id);

    watch(idSelectedColor, (newColorId) => {
      const newImage = props.colors.find((item) => (item.color.id === newColorId));
      if (newImage.gallery) {
        context.emit('newImage', newImage.gallery[0].file.url);
      } else {
        const urlNotFoto = 'https://etk23.ru/image/cache/10836_1-800x800.jpeg';
        context.emit('newImage', urlNotFoto);
      }
    });

    return {
      idSelectedColor,
    };
  },

});
</script>

<style scoped>
  .colors__value{
    border: 1px solid #ccc;
  }
</style>
