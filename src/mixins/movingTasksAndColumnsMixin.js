export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    column: {
      type: Object,
      required: false,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    moveColumn({ fromColumnIndex }) {
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex: this.columnIndex,
      });
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.columns[fromColumnIndex].tasks;
      console.log(this.column.tasks);
      this.$store.commit("MOVE_TASK", {
        fromTaskIndex,
        fromTasks,
        toTaskIndex: this.taskIndex,
        toTasks: this.column.tasks,
      });
    },
    moveTaskOrColumn(transferData) {
      const { type } = transferData;
      switch (type) {
        case "task":
          this.moveTask(transferData);
          break;
        case "column":
          this.moveColumn(transferData);
          break;
        default:
          break;
      }
    },
  },
};
