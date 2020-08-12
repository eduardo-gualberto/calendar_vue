<template>
  <div id="root">
    <h1 id="title" style="font-size: 50px;">
      Vue Calendar App!
    </h1>
    <div id="wrapper">
      <CalendarUnit
        class="unit"
        v-for="data in calendarData"
        :key="data.id"
        :info="data"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarUnit from "./CalendarUnit.vue";

import CalendarUnitT from "../models/CalendarUnit";
import CalendarUnitTileT from "../models/CalendarTile";
import VModal from "vue-js-modal";

@Component({
  components: { CalendarUnit },
})
export default class Calendar extends Vue {
  private idCounter = 0;
  calendarData: Array<CalendarUnitT> = [
    { day: "SUN", tiles: [], id: this.idCounter++ },
    { day: "MON", tiles: [], id: this.idCounter++ },
    { day: "TUE", tiles: [], id: this.idCounter++ },
    { day: "WED", tiles: [], id: this.idCounter++ },
    { day: "THU", tiles: [], id: this.idCounter++ },
    { day: "FRI", tiles: [], id: this.idCounter++ },
    { day: "SAT", tiles: [], id: this.idCounter++ },
  ];
}
</script>

<style scoped>
#root {
  background-color: grey;
  width: 100%;
  height: 100%;
  overflow: auto;
}

#title {
  text-align: center;
  color: whitesmoke;
}

#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.unit {
  min-width: min-content;
  max-width: 95%;
  width: 80%;
  flex-shrink: 0;
  text-align: center;
  margin: 1vh;
  border: 2px solid black;
  height: 400px;
  flex-grow: 0;
}

@media only screen and (min-width: 769px) {
  #wrapper {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .unit {
    flex-basis: 32%;
  }
}
</style>
