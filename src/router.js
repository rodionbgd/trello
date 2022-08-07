import { createRouter, createWebHistory } from "vue-router";
import BoardView from "@/views/BoardView.vue";
import TaskView from "@/views/TaskView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "board",
      component: BoardView,
      children: [
        {
          path: "task/:id",
          name: "task",
          component: TaskView,
        },
      ],
    },
  ],
});

export default router;
