<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница"
        :class="{'pagination__link--disabled':disabledBtnPrev }"
        @click.prevent="!disabledBtnPrev && paginate(currentPage-1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item"
    v-for="page in pages" :key="page">
      <a class="pagination__link"
      :class="{'pagination__link--current': currentPage === page }"
      @click.prevent="paginate(page)">
       {{page}} </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        :class="{'pagination__link--disabled':disabledBtnNext }"
        @click.prevent="!disabledBtnNext && paginate(currentPage+1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['currentPage', 'pages', 'paginate'],

  setup(props) {
    const disabledBtnPrev = props.currentPage === 1;
    const disabledBtnNext = props.currentPage === props.pages;

    return {
      disabledBtnPrev,
      disabledBtnNext,
    };
  },

});
</script>

<style scoped>
  .pagination__link{
    cursor: pointer;
  }
  .pagination__link--disabled{
    cursor: not-allowed;
  }
</style>>
