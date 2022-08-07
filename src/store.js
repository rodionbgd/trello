import { createStore } from "vuex";
import defaultBoard from "@/default-board";
import { saveStatePlugin, uuid } from "@/utils";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

const store = createStore({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
      });
    },
    CREATE_COLUMN(state, { name }) {
      if (state.board.columns.find((column) => column.name === name)) {
        return;
      }
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    REMOVE_COLUMN(state, { name }) {
      state.board.columns = state.board.columns.filter(
        (column) => column.name !== name
      );
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    UPDATE_COLUMN(state, { name }) {
      const sameColumns = state.board.columns.filter(
        (column) => column.name === name
      );
      if (sameColumns.length === 1) {
        return;
      }
      [...sameColumns.slice(1)].forEach((column) =>
        sameColumns[0].tasks.push(...column.tasks)
      );
      state.board.columns = state.board.columns.filter(
        (column) => column.name !== name
      );
      state.board.columns.push(sameColumns[0]);
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
  },
  getters: {
    getTask(state) {
      return function (id) {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
});

export default store;
