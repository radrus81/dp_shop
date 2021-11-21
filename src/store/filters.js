export default {
  state: {
    startFilter: 0,
    minPrice: 0,
    maxPrice: 0,
    categoryId: 0,
    materialIds: [],
    seasonIds: [],
    categories: [],
    materials: [],
    seasons: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setMaterials(state, materials) {
      state.materials = materials;
    },
    setSeasons(state, seasons) {
      state.seasons = seasons;
    },
    setStartFilter(state, status) {
      state.startFilter = status;
    },
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
    resetFilters(state, status) {
      state.startFilter = status;
      state.minPrice = 0;
      state.maxPrice = 0;
      state.categoryId = 0;
      state.materialIds = [];
      state.seasonIds = [];
    },
  },
  getters: {
    storeStartFilter(state) {
      return state.startFilter;
    },
    storeCategories(state) {
      return state.categories;
    },
    storeMaterials(state) {
      return state.materials;
    },
    storeSeasons(state) {
      return state.seasons;
    },
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
