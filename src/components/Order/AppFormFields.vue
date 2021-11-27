<template>
  <div class="cart__field">
    <div class="cart__data">
      <app-form-text
        title="ФИО"
        :error="formError.name"
        v-model="formData.name"
        placeholder="Введите ваше полное имя"
      >
      </app-form-text>

      <app-form-text
        title="Адрес доставки"
        :error="formError.address"
        v-model="formData.address"
        placeholder="Введите ваш адрес"
      >
      </app-form-text>

      <app-form-text
        title="Телефон"
        :error="formError.phone"
        v-model="formData.phone"
        placeholder="Введите ваш телефон"
      >
      </app-form-text>

      <app-form-text
        title="Email"
        :error="formError.email"
        v-model="formData.email"
        type="email"
        placeholder="Введи ваш Email"
      >
      </app-form-text>

      <app-form-textarea
        title="Комментарий к заказу"
        :error="formError.comment"
        v-model="formData.comment"
        placeholder="Ваши пожелания"
      >
      </app-form-textarea>
    </div>

    <div class="cart__options">
      <the-delivery @updateDelivery="formData.deliveryTypeId=$event"></the-delivery>
      <the-payment
        :key="formData.deliveryTypeId"
        :deliveryTypeId="formData.deliveryTypeId"
        @updatePayment="formData.paymentTypeId=$event"></the-payment>
    </div>
  </div>
</template>

<script>
import AppFormText from './AppFormText.vue';
import AppFormTextarea from './AppFormTextarea.vue';
import TheDelivery from './TheDelivery.vue';
import ThePayment from './ThePayment.vue';

export default {
  props: ['formError'],
  emits: ['updateFormData'],
  components: {
    AppFormText, AppFormTextarea, TheDelivery, ThePayment,
  },
  data() {
    return {
      formData: {
        deliveryTypeId: 2,
        paymentTypeId: 1,
      },
    };
  },
  // для слежки за объектом нужно создать строковый объект
  computed: {
    copyFormData() {
      return JSON.stringify(this.formData);
    },
  },
  watch: {
    // и потом следить за ним
    copyFormData(newValue) {
      // передаем событие родителю
      this.$emit('updateFormData', JSON.parse(newValue));
    },
  },
};
</script>
