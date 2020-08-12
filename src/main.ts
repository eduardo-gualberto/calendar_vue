import Vue from "vue";
import App from "./App.vue";

import {
  BootstrapVue,
  ModalPlugin,
  IconsPlugin,
  VBModalPlugin,
  ButtonPlugin,
  BButton,
  VBModal,
  BModal,
  BFormInput,
  BButtonGroup,
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ModalPlugin);
Vue.use(IconsPlugin);
Vue.use(ButtonPlugin);
Vue.use(VBModalPlugin);

Vue.component("b-button", BButton);
Vue.component("b-modal", BModal);
Vue.component("b-form-input", BFormInput);
Vue.component("b-button-group", BButtonGroup);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
