export default {
  state: {
    page: 1,
    pages: 0,
    total: 0,
  },
  mutations: {
    setPage(state, selectedPage) {
      state.page = selectedPage;
    },
    setPaginationData(state, paginationData) {
      console.log('paginationData', paginationData);
      state.pages = paginationData.pages;
      state.total = paginationData.total;
    },
  },
  getters: {
    storePaginationData(state) {
      return {
        page: state.page,
        pages: state.pages,
        total: state.total,
      };
    },
  },
  actions: {
  },
};
