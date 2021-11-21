import AppSpinner from '@/components/UI/AppLoader.vue';
import AppAlert from '@/components/UI/AppAlert.vue';

const registerComponents = (app) => {
  app.component('app-spinner', AppSpinner);
  app.component('app-alert', AppAlert);
};

export default registerComponents;
