<template>
  <main class="content container">
    <app-alert v-if="!$store.getters.countCartData">
    <p>Нет товаров в корзине. Выберите товары.</p>
  </app-alert>
    <div class="content__top" v-if="$store.getters.countCartData">
      <app-breadcrumbs :dataBreadcrumbs="dataBreadcrumbs"></app-breadcrumbs>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ $store.getters.countCartData }} товара </span>
      </div>
    </div>

    <section class="cart" v-if="$store.getters.countCartData">
      <form class="cart__form form" @submit.prevent="this.$router.push({ name: 'order' })">
        <div class="cart__field">
          <ul class="cart__list">
            <li class="cart__item product" v-for="product in products" :key="product.productId">
              <div class="product__pic">
                <img :src="product.img" width="120" height="120" :alt="product.title" />
              </div>
              <h3 class="product__title">{{ product.title }}</h3>
              <p class="product__info product__info--color">
                Цвет:
                <span class="colors__value">
                  <i :style="{ 'background-color': product.color }"></i>
                  {{ product.colorTitle }} </span
                ><br /><br />
                Размер:
                <span>{{ product.size }}</span>
              </p>

              <span class="product__code"> Артикул: {{ product.productId }} </span>

              <amount-selection
                :quantity="product.amount"
                @decrementAmount="()=>updateAmount(product.productId, --product.amount)"
                @incrementAmount="()=>updateAmount(product.productId, ++product.amount)"
                @update:modelValue="($event)=>updateAmount(product.productId, $event)"
              ></amount-selection>

              <b class="product__price"> {{ product.price }} ₽ </b>

              <button
                class="product__del button-del"
                type="button"
                aria-label="Удалить товар из корзины"
                title="Удалить товар из корзины"
                @click="()=>removeProduct(product.productId)"
              >
                <svg width="20" height="20" >
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <button
            class="cart__button button button--primery"
            type="submit"
          >Оформить заказ</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppBreadcrumbs from '@/components/UI/AppBreadcrumbs.vue';
import AmountSelection from '@/components/AmountSelection.vue';
import numberFormat from '../helpers/numberFormat';

export default {
  components: { AppBreadcrumbs, AmountSelection },
  setup() {
    const $store = useStore();
    const dataBreadcrumbs = [
      {
        id: 1,
        title: 'Корзина',
      },
    ];

    const products = computed(() => $store.getters.storeCartData || []);

    const totalPrice = computed(() => numberFormat(
      products.value.reduce((acc, item) => acc + item.price, 0),
    ));

    const updateAmount = (productId, quantity) => {
      if (quantity === '') { return; }
      if (quantity && quantity >= 1 && !Number.isNaN(quantity)) {
        $store.dispatch('updateCartProductAmount', {
          productId,
          quantity,
        });
      } else {
        $store.dispatch('updateCartProductAmount', {
          productId,
          quantity: 1,
        });
      }
    };

    const removeProduct = (productId) => {
      $store.dispatch('removeProduct', {
        productId,
      });
    };

    return {
      dataBreadcrumbs,
      products,
      totalPrice,
      updateAmount,
      removeProduct,
    };
  },
};
</script>

<style scoped>
  .button-del {
    cursor: pointer;
  }

  .button-del svg {
    transition: 1s outline ease-out;
  }

  .button-del:hover svg {
    border-radius: 50%;
    outline: 1px solid #ccc;
  }

  .colors__value i{
    border: 1px solid #ccc;
    margin-top: -3px;
  }

</style>
