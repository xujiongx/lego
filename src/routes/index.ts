import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import Template from "../views/Template.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { withHeader: true },
    },
    {
      path: "/editor/:id",
      name: "editor",
      component: Editor,
    },
    {
      path: "/template/:id",
      name: "template",
      component: Template,
      meta: { withHeader: true },
    },
  ],
});

export default router;
