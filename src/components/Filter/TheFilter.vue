<template>
  <aside class="filter">
    <form class="filter__form form" method="get">
     <the-price></the-price>
     <the-category></the-category>
     <the-material></the-material>
     <the-collection></the-collection>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button">Сбросить</button>
    </form>
  </aside>
</template>

<script>
import ThePrice from './ThePrice.vue';
import TheCategory from './TheCategory.vue';
import TheMaterial from './TheMaterial.vue';
import TheCollection from './TheCollection.vue';

export default {
  components: {
    ThePrice, TheCategory, TheMaterial, TheCollection,
  },
};
</script>
