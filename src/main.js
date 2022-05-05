import { add } from "./tools/add.js";
console.log(add(1, 2));
console.log("我是main.js");

// import "./styles/index.scss";
// import "./styles/index.less";

import Vue from "vue";
// import App from "./components/App.vue";
//配置别名后引用，此时@代表目录src
import App from "@/components/App.vue";
new Vue({
  render: (h) => h(App),
}).$mount("#app");
