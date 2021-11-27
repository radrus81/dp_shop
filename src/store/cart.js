import axiox from 'axios';
import { API_BASE_URL } from '@/constants';
import errorMessaage from '@/helpers/errorMessage';

export default {
  state: {
    userAccessKey: null,
    cartProducts: [],
    cartProductsData: [],
    deliveryPrice: 0,
    orderInfo: null,
  },

  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, cartProductsData) {
      state.cartProductsData = cartProductsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.id,
        amount: item.quantity,
        title: item.product.title,
        color: item.color.color.code,
        colorTitle: item.color.color.title,
        img: item.color.gallery[0].file.url,
        size: item.size.title,
        price: item.price * item.quantity,
      }));
    },
    updateDeliveryPrice(state, price) {
      state.deliveryPrice = price;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
  },

  actions: {
    async loadCart(context) {
      try {
        const response = await axiox.get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      } catch (e) {
        context.commit('setTypeMessage', {
          type: 'error',
          message: `${errorMessaage(e)}. Загрузка товаров не произошла. Попробуйте еще раз обновить страницу.`,
        });
      }
    },

    async addProductToCart(context, {
      productId, amount, sizeId, colorId,
    }) {
      try {
        const response = await axiox.post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
          colorId,
          sizeId,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
        context.commit('setTypeMessage', {
          type: 'success',
          message: 'Товар успешно добавлен в корзину',
        });
      } catch (e) {
        context.commit('setTypeMessage', {
          type: 'error',
          message: `${errorMessaage(e)}. Товар не добавлен`,
        });
      }
    },

    async updateCartProductAmount(context, { productId, quantity }) {
      try {
        const response = await axiox.put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId: productId,
          quantity,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      } catch (e) {
        context.commit('syncCartProducts');
        context.commit('setTypeMessage', {
          type: 'error',
          message: `${errorMessaage(e)}. Обновление количества не произошло`,
        });
      }
    },

    async removeProduct(context, { productId }) {
      try {
        const response = await axiox.delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            basketItemId: productId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
        context.commit('setTypeMessage', {
          type: 'success',
          message: 'Тoвар успешно удален',
        });
      } catch (e) {
        context.commit('setTypeMessage', {
          type: 'error',
          message: `${errorMessaage(e)}. Товар не удален`,
        });
      }
    },
  },

  getters: {
    storeCartData(state) {
      return state.cartProducts;
    },
    countCartData(state) {
      return state.cartProducts.length;
    },
    deliveryPrice(state) {
      return state.deliveryPrice;
    },
    userAccessKey(state) {
      return state.userAccessKey;
    },
    orderInfo(state) {
      return state.orderInfo;
    },
  },
};
