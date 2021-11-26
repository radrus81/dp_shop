import { createApp } from 'vue';
import { SnackbarService } from 'vue3-snackbar';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue3-snackbar/dist/style.css';

import registerComponents from './registerComponents';

const app = createApp(App)
  .use(SnackbarService)
  .use(store)
  .use(router);

registerComponents(app);
app.mount('#app');
