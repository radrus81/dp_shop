export default {
  state: {
    minPrice: 0,
    maxPrice: 0,
    categoryId: 0,
    materialIds: [],
    seasonIds: [],
  },
  mutations: {
    setMinPrice(state, price) {
      state.minPrice = price;
    },
    setMaxPrice(state, price) {
      state.maxPrice = price;
    },
    setCategoryId(state, id) {
      state.categoryId = id;
    },
    setMaterialId(state, ids) {
      state.materialIds = ids;
    },
    setSeasonsId(state, ids) {
      state.seasonIds = ids;
    },
  },
  getters: {
    storeMinPrice(state) {
      return state.minPrice;
    },
    storeMaxPrice(state) {
      return state.maxPrice;
    },
    storeCategoryId(state) {
      return state.categoryId;
    },
    storeMaterialIds(state) {
      return state.materialIds;
    },
    storeSeasonIds(state) {
      return state.seasonIds;
    },
  },
  actions: {
  },
};
