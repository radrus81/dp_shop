<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in listProducts" :key="product.product">
        <h3>{{ product.title }}</h3>
        <b>{{ product.price }} ₽</b>
        <span>Артикул: {{ product.product }}</span>
        <span class="amount">Кол-во: {{ product.amount }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b>{{ !+deliveryPrice ? "бесплатно" : `${deliveryPrice} ₽` }}</b>
      </p>
      <p>
        Итого: <b>{{ listProducts.length }}</b> товара на сумму <b>{{ totalPrice }} ₽</b>
      </p>
    </div>

    <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
  </div>
</template>

<script>
export default {
  props: ['delivery'],
  data() {
    return {
      deliveryPrice: this.$store.getters.deliveryPrice,
    };
  },
  computed: {
    listProducts() {
      return this.$store.getters.storeCartData;
    },
    totalPrice() {
      const totalPriceProduct = this.listProducts.reduce((acc, item) => acc + item.price, 0);
      return !+this.deliveryPrice
        ? totalPriceProduct
        : totalPriceProduct + Number(this.deliveryPrice);
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    '$store.getters.deliveryPrice': function (newValue) {
      this.deliveryPrice = newValue;
    },
  },
};
</script>

<style scoped>
.amount {
  text-align: end;
}
</style>
