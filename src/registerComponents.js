import Spinner from './components/UI/TheLoader.vue';

const registerComponents = (app) => {
  app.component('app-spinner', Spinner);
};

export default registerComponents;
