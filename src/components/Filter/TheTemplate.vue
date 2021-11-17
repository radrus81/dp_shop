<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{title}}</legend>
    <app-spinner v-if="isLoading"></app-spinner>
    <the-alert v-else-if="isLoadingError"></the-alert>
    <ul v-else class="check-list">
      <li class="check-list__item" v-for="item in items" :key="item.id">
        <label class="check-list__label">
          <input
            class="check-list__check sr-only"
            type="checkbox"
            name="collection"
            :value="item.id"
            @click="onHandler($event, item.id)"
          />
          <span class="check-list__desc">
            {{ item.title }}
            <span>({{ item.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import TheAlert from '../UI/TheAlert.vue';

export default {
  props: ['title', 'isLoading', 'isLoadingError', 'items', 'onHandler'],
  components: { TheAlert },
};
</script>

<style></style>
