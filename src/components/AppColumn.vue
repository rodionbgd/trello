<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
    >
      <div
        class="flex items-between justify-between mb-2 font-bold"
        v-if="!isEdit"
        @dblclick="isEdit = true"
      >
        {{ column.name }}
        <div>
          <button class="text-right" @click="removeColumn(column)">x</button>
        </div>
      </div>
      <div v-else>
        <input type="text" v-model="column.name" @keyup.enter="updateColumn" />
      </div>
      <div class="list-reset">
        <app-task
          v-for="(task, taskIndex) of column.tasks"
          :key="taskIndex"
          :task="task"
          :taskIndex="taskIndex"
          :columnIndex="columnIndex"
          :columns="columns"
          :column="column"
        />
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+Enter task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppTask from "@/components/AppTask.vue";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

export default {
  name: "AppColumn",
  mixins: [movingTasksAndColumnsMixin],
  components: {
    AppTask,
    AppDrag,
    AppDrop,
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    createTask(event, tasks) {
      if (!event.target.value) {
        return;
      }
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value,
      });
      event.target.value = "";
    },
    removeColumn(columnToRemove) {
      this.$store.commit("REMOVE_COLUMN", columnToRemove);
    },
    updateColumn() {
      this.$store.commit("UPDATE_COLUMN", this.column);
      this.isEdit = false;
    },
  },
};
</script>

<style scoped>
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
