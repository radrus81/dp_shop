import { createStore } from 'vuex';
import filters from './filters';
import cart from './cart';

export default createStore({
  state: {
    typeMessage: null,
    message: null,
  },
  mutations: {
    setTypeMessage(state, payload) {
      state.typeMessage = payload.type;
      state.message = payload.message;
    },
  },
  getters: {
    storeTypeMessage(state) {
      return {
        type: state.typeMessage,
        text: state.message,
      };
    },
  },
  actions: {
  },
  modules: {
    filters,
    cart,
  },
});
