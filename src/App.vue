<template>
  <div id="app">
    <Calendar></Calendar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calendar from "./components/Calendar.vue";
import CalendarUnit from "./components/CalendarUnit.vue";
import CalendarTile from "./components/CalendarTile.vue";
import { BModal, VBModal, BButton } from "bootstrap-vue";

@Component({
  components: { Calendar, CalendarUnit, BModal, BButton, CalendarTile },
})
export default class App extends Vue {}
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  height: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
