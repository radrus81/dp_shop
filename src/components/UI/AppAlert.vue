<template>
  <div class="cart__error form__error-block">
    <slot>
      <h4>Произошла ошибка!</h4>
      <p>Попробуйте снова перезагрузить страницу.</p>
    </slot>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="css" scoped>
  .form__error-block{
    padding: 10px;
    margin-bottom: 15px;
  }
</style>
