<template>
  <h3 class="cart__title">Доставка</h3>
  <app-spinner v-if="isLoading"></app-spinner>
  <app-alert v-else-if="isLoadingError"></app-alert>
  <ul v-else class="cart__options options">
    <li class="options__item" v-for="item in deliveryData" :key="item.id">
      <label class="options__label">
        <input
          class="options__radio sr-only"
          type="radio"
          name="delivery"
          :value="item.id"
          v-model="deliveryId"
        />
        <span class="options__value">
           {{item.title}}
             <b>
             {{item.title === 'Самовывоз' ? 'бесплатно' : `${item.price} ₽`}}
            </b>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import useFilter from '@/hooks/useFilter';

export default {
  emits: ['updateDelivery'],

  setup(_, context) {
    const $store = useStore();
    const deliveryId = ref(0);

    const {
      items: deliveryData,
      isLoading,
      isLoadingError,
      loadItems: loadDelivery,
    } = useFilter('/api/deliveries');

    loadDelivery();

    watch(deliveryData, () => {
      deliveryId.value = deliveryData.value[0].id;
    });

    watch(deliveryId, (newValue) => {
      const deliveryPrice = deliveryData.value.find((item) => item.id === newValue).price;
      $store.commit('updateDeliveryPrice', deliveryPrice);
      context.emit('updateDelivery', newValue);
    });

    return {
      deliveryId,
      deliveryData,
      isLoading,
      isLoadingError,
    };
  },
};
</script>

<style></style>
