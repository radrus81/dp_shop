<template>
  <main class="content container">
    <app-spinner v-if="isLoading"></app-spinner>
    <app-alert v-else-if="isLoadingError" :message="messageError"></app-alert>
    <div v-else>
      <div class="content__top">
        <app-breadcrumbs :dataBreadcrumbs="dataBreadcrumbs"></app-breadcrumbs>
        <h1 class="content__title">
          Заказ оформлен <span>№ {{ orderInfo && orderInfo.id }}</span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
              с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
              уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key"> Получатель </span>
                <span class="dictionary__value">
                  {{ orderInfo && orderInfo.name }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Адрес доставки </span>
                <span class="dictionary__value">
                  {{ orderInfo && orderInfo.address }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Телефон </span>
                <span class="dictionary__value">
                  {{ orderInfo && orderInfo.phone }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Email </span>
                <span class="dictionary__value">
                  {{ orderInfo && orderInfo.email }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Способ оплаты </span>
                <span class="dictionary__value"> {{orderInfo && orderInfo.paymentType}} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Статус обработки заказа </span>
                <span class="dictionary__value">
                  <b>{{orderInfo && orderInfo.status.title}}</b>
                </span>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li
                class="cart__order"
                v-for="item in orderInfo ? orderInfo.basket.items : []"
                :key="item.id"
              >
                <h3>{{ item.product.title }}</h3>
                <b>{{ item.product.price }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>
                Доставка: {{ orderInfo && orderInfo.deliveryType.title }}
                <b
                  >{{
                    orderInfo && !+orderInfo.deliveryType.price
                      ? "бесплатно"
                      : `${orderInfo && orderInfo.deliveryType.price} ₽`
                  }}
                </b>
              </p>
              <p>
                Итого: <b>{{ orderInfo && orderInfo.basket.items.length }}</b> товара на сумму
                <b>{{ orderInfo && orderInfo.totalPrice }} ₽</b>
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@/constants';
import AppBreadcrumbs from '@/components/UI/AppBreadcrumbs.vue';
import isObject from '@/helpers/isObject';

export default {
  components: { AppBreadcrumbs },
  setup() {
    const isLoading = ref(false);
    const isLoadingError = ref(false);
    const messageError = ref(null);

    const $store = useStore();
    const $route = useRoute();

    const loadOrderInfo = async (orderId) => {
      isLoading.value = true;
      isLoadingError.value = false;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: $store.getters.userAccessKey,
          },
        });

        $store.commit('updateOrderInfo', response.data);
        isLoading.value = false;
      } catch (e) {
        isLoading.value = false;
        isLoadingError.value = true;
        if (e.response.data.error.message) {
          messageError.value = e.response.data.error.message;
        } else {
          Object.values(e.response.data.error).forEach((item) => {
            if (isObject(item)) {
              Object.values(item).forEach((text) => {
                messageError.value += `${text} ,`;
              });
            }
          });
        }
      }
    };

    if (!$store.getters.orderInfo || $store.getters.orderInfo.id !== $route.params.id) {
      loadOrderInfo($route.params.id);
    }

    const orderInfo = computed(() => $store.getters.orderInfo);

    return {
      isLoading,
      isLoadingError,
      orderInfo,
      messageError,
      dataBreadcrumbs: [
        {
          id: 1,
          title: 'Корзина',
          url: 'cart',
        },
        {
          id: 2,
          title: 'Оформление заказа',
        },
      ],
    };
  },
};
</script>

<style></style>
