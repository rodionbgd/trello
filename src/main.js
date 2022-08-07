import { createApp } from "vue";
import "@/plugins/fontawesome";
import store from "@/store";

import App from "@/App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AppButton from "@/components/AppButton.vue";

import "@/assets/tailwind.css";

const app = createApp(App);

app.component(AppButton.name, AppButton);
app.component("AppIcon", FontAwesomeIcon);

app.use(store).mount("#app");
