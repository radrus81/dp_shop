<template>
   <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            @focus="isMinFocus = true"
            @blur="isMinFocus = false"
            v-model.number="minPrice" />
            {{minPrice2}}
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            @focus="isMaxFocus = true"
            @blur="isMaxFocus = false"
            v-model.number="maxPrice"
             />
          <span class="form__value">До</span>
        </label>
      </fieldset>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isMinFocus: false,
      isMaxFocus: false,
      minPrice: 0,
      maxPrice: 0,
    };
  },
  methods: {
    ...mapMutations(['setMinPrice', 'setMaxPrice']),
  },
  watch: {
    isMinFocus(isFocus) {
      if (!isFocus) {
        if (!this.minPrice) {
          this.setMinPrice(0);
        } else {
          this.setMinPrice(this.minPrice);
        }
      } else if (!this.minPrice) this.minPrice = '';
    },
    isMaxFocus(isFocus) {
      if (!isFocus) {
        if (!this.maxPrice) {
          this.setMaxPrice(0);
        } else {
          this.setMaxPrice(this.maxPrice);
        }
      } else if (!this.maxPrice) this.maxPrice = '';
    },
    storeMinPrice(price) {
      this.minPrice = price;
    },
    storeMaxPrice(price) {
      this.maxPrice = price;
    },
  },

  created() {
    this.minPrice = this.storeMinPrice;
    this.maxPrice = this.storeMaxPrice;
  },
  computed: {
    ...mapGetters({ storeMinPrice: 'storeMinPrice', storeMaxPrice: 'storeMaxPrice' }),
  },
};
</script>

<style>

</style>
