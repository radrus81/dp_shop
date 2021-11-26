<template>
  <form class="form" @submit.prevent="addToCart">
    <div class="item__row item__row--center">
      <app-btn-control
        :quantity="amount"
        @decrementAmount="amount--"
        @incrementAmount="amount++"
        @update:modelValue="amount = $event"
      ></app-btn-control>
      <b class="item__price"> {{ prityPrice }} ₽ </b>
    </div>

    <div class="item__row">
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="{ color } in product.colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-item"
                v-model="colorId"
                :value="color.id"
              />
              <span class="colors__value" :style="{ 'background-color': color.code }"> </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Размер</legend>
        <label class="form__label form__label--small form__label--select">
          <select class="form__select" type="text" name="category" v-model="sizeId">
            <option v-for="{ id, title } in product.sizes" :key="id" :value="id">
              {{ title }}
            </option>
          </select>
        </label>
      </fieldset>
    </div>

    <button class="item__button button button--primery" type="submit">Положить в корзину</button>
    <button
      class="item__button button button--primery button--success"
      @click="this.$router.push({ name: 'cart' })"
    >
      Перейти в корзину
    </button>
  </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import AppBtnControl from '../AppBtnControl.vue';

export default {
  components: { AppBtnControl },
  props: ['product'],
  data() {
    return {
      colorId: this.product.colors[0].color.id,
      amount: 1,
      price: this.product.price,
      sizeId: this.product.sizes[0].id,
    };
  },
  methods: {
    ...mapActions(['addProductToCart']),
    ...mapMutations(['updateShowModal', 'updateMessageModal']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({
        productId: this.product.id,
        amount: this.amount,
        colorId: this.colorId,
        sizeId: this.sizeId,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
  },
  computed: {
    prityPrice() {
      return numberFormat(this.price);
    },
  },
  watch: {
    amount() {
      if (this.amount === '') {
        return;
      }
      if (this.amount && this.amount >= 1 && !Number.isNaN(this.amount)) {
        this.price = this.amount * this.product.price;
      } else {
        this.amount = 1;
      }
    },
  },
};
</script>

<style scoped>
.button--primery {
  margin-right: 25px;
}

.button--success {
  background-color: #4da474;
}

.colors__value{
  border: 1px solid #ccc;
}
</style>
