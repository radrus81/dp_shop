<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link :to="{ name: 'home' }" class="breadcrumbs__link"> Каталог </router-link>
    </li>
    <li class="breadcrumbs__item" v-for="({ id, title }, idx) in dataBreadcrumbs" :key="id">
      <router-link
        v-if="idx !== dataBreadcrumbs.length-1"
        :to="{ name: 'home' }"
        class="breadcrumbs__link"
      >
        {{ title }}
      </router-link>
      <span v-else class="breadcrumbs__link"> {{ title }} </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['dataBreadcrumbs'],
};
</script>

<style></style>
