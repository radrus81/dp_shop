<template>
  <main class="content container">
    <div class="content__top">
      <app-breadcrumbs :dataBreadcrumbs="dataBreadcrumbs"></app-breadcrumbs>
      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="order">
        <app-form-fields :formError="formError" @updateFormData="updateFormData"></app-form-fields>
        <app-list-products :delivery="formData.delivery" @order="order"></app-list-products>

        <div class="cart__error form__error-block" v-if="messageError">
          <h4>Заявка не отправлена!</h4>
          <p>
            Ошибка <b style="color: red">({{ messageError }})</b>. Попробуйте отправить снова или
            перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import AppBreadcrumbs from '@/components/UI/AppBreadcrumbs.vue';
import AppFormFields from '@/components/Order/AppFormFields.vue';
import AppListProducts from '@/components/Order/AppListProducts.vue';
import { API_BASE_URL } from '@/constants';
import isObject from '@/helpers/isObject';

export default {
  components: {
    AppBreadcrumbs,
    AppFormFields,
    AppListProducts,
  },
  data() {
    return {
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
      formData: {},
      formError: {},
      messageError: '',
    };
  },
  methods: {
    ...mapMutations(['updateShowModal', 'updateMessageModal', 'resetCart', 'updateOrderInfo']),
    updateFormData(data) {
      this.formData = data;
    },

    async order() {
      this.formError = {};
      this.messageError = '';
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/orders`,
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.getters.userAccessKey,
            },
          },
        );
        this.resetCart();
        this.formData = {};
        this.updateOrderInfo(response.data);
        this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
      } catch (e) {
        if (e.response.data.error.message) {
          this.messageError = e.response.data.error.message;
        } else {
          this.formError = e.response.data.error.request || {};

          Object.values(e.response.data.error).forEach((item) => {
            if (isObject(item)) {
              Object.values(item).forEach((text) => { this.messageError += `${text} ,`; });
            }
          });
        }
      }
    },
  },
};
</script>

<style></style>
