<template>
  <BoardView />
</template>

<script>
import BoardView from "@/views/BoardView.vue";

export default {
  name: "App",
  components: { BoardView },
};
</script>
<style>
body,
html {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.container {
  @apply mx-auto;
}
</style>
