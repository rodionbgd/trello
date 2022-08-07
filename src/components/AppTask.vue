<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

export default {
  name: "AppTask",
  components: {
    AppDrag,
    AppDrop,
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-600 no-underline;
}
</style>
