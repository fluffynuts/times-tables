import { createApp } from "vue"
import App from "./App.vue"
import ConfettiExplosion from "vue-confetti-explosion";

const app = createApp(App);
app.use(ConfettiExplosion);
app.mount("#app");
