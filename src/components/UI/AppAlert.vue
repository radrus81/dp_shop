<template>
  <div class="cart__error form__error-block">
    <slot>
      <h4>Произошла ошибка!</h4>
      <p v-if="message" class="message">{{message}}!</p>
      <p>Попробуйте снова перезагрузить страницу.</p>
    </slot>
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>

<style lang="css" scoped>
  .form__error-block{
    padding: 10px;
    margin-bottom: 15px;
  }

  .message{
    color: #e02d71;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
