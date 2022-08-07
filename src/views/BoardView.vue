<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <app-column
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
        :columns="board.columns"
      />
      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppColumn from "@/components/AppColumn.vue";

export default {
  components: {
    AppColumn,
  },
  data() {
    return {
      newColumnName: "",
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    createColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName,
      });
      this.newColumnName = "";
    },
  },
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-300 h-full overflow-auto;
}

.task-bg {
  @apply absolute;
  width: 100%;
  margin: 0 auto;
  top: 6rem;
}
</style>
