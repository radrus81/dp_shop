<template>
  <app-spinner v-if="isLoading"></app-spinner>
  <app-alert v-else-if="isLoadingError"></app-alert>
  <h3 v-else class="cart__title">Оплата</h3>
      <ul class="cart__options options">
        <li class="options__item" v-for="item in paymentData" :key="item.id">
          <label class="options__label">
            <input
              class="options__radio sr-only"
              type="radio"
              name="pay"
              :value="item.id"
              v-model="paymentId"
            />
            <span class="options__value"> {{item.title}} </span>
          </label>
        </li>
      </ul>

</template>

<script>
import { ref, watch } from 'vue';

import useFilter from '@/hooks/useFilter';

export default {
  props: ['deliveryTypeId'],
  emits: ['updatePayment'],

  setup(props, context) {
    const paymentId = ref(0);

    const {
      items: paymentData,
      isLoading,
      isLoadingError,
      loadItems: loadPayment,
    } = useFilter('/api/payments');

    const params = {
      params: {
        deliveryTypeId: props.deliveryTypeId,
      },
    };

    loadPayment(params);
    watch(paymentData, () => {
      paymentId.value = paymentData.value[0].id;
    }, { immediate: true });

    watch(paymentId, (newValue) => {
      context.emit('updatePayment', newValue);
    }, { immediate: true });

    return {
      paymentId,
      paymentData,
      isLoading,
      isLoadingError,
    };
  },
};
</script>
