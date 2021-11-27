<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      :class="{}"
      @click="decrement"
      :disabled="amount === 1"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input type="text" v-model="amount" name="count" />

    <button type="button" aria-label="Добавить один товар" @click="incrementAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['quantity'],
  emits: ['update:modelValue'],
  computed: {
    amount: {
      get() {
        return this.quantity;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    decrement() {
      this.$emit('decrementAmount');
    },

    incrementAmount() {
      this.$emit('incrementAmount');
    },
  },
};
</script>

<style scoped>
.colors__value {
  border: 1px solid #ccc;
}

button:disabled{
  cursor: not-allowed;
}

button:disabled:hover{
  background-color: transparent;
  color: #ccc;
}
</style>
