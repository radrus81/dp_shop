import { Vue3Snackbar } from 'vue3-snackbar';
import AppSpinner from '@/components/UI/AppLoader.vue';
import AppAlert from '@/components/UI/AppAlert.vue';

const registerComponents = (app) => {
  app.component('app-spinner', AppSpinner);
  app.component('app-alert', AppAlert);
  app.component('vue3-snackbar', Vue3Snackbar);
};

export default registerComponents;
