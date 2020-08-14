<template>
  <div id="root">
    <h1 id="title" style="font-size: 50px;">
      Vue Calendar App!
    </h1>
    <div id="wrapper">
      <CalendarUnit
        :ref="`unit${data.id}`"
        class="unit"
        v-for="data in calendarData"
        :key="data.id"
        :info="data"
        @addModal="addOpen"
        @editModal="editOpen"
      />
    </div>

    <!-- MODAL -->
    <b-modal
      id="calendar-modal"
      centered
      size="lg"
      button-size="lg"
      @ok="modalOkHandler"
      @hide="modalHideHandles"
    >
      <template v-slot:modal-title>
        <h2>{{ title }}</h2>
      </template>
      <div class="modal-body">
        <label for="modal-input">Nome do 'todo'</label>
        <b-form-input
          autofocus
          ref="inputModal"
          id="modal-input"
          name="modal-input"
          v-model="inputModel"
          placeholder="input no body do modal"
        />

        <label for="" style="margin-top: 20px;">Cor do 'todo'</label>
        <b-button-group class="btn-group">
          <b-button
            style="background-color: #228f07;"
            @click="selectColor('#228f07')"
            >Verde</b-button
          >
          <b-button
            style="background-color: #cdb30c;"
            @click="selectColor('#cdb30c')"
            >Amarelo</b-button
          >
          <b-button
            style="background-color: #b0070f;"
            @click="selectColor('#b0070f')"
            >Vermelho</b-button
          >
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarUnit from "./CalendarUnit.vue";
import CalendarTile from "./CalendarTile.vue";

import CalendarUnitT from "../models/CalendarUnit";
import CalendarUnitTileT from "../models/CalendarTile";
// import Modal from "./Modal.vue";

import {
  BModal,
  VBModal,
  BButton,
  BFormInput,
  BButtonGroup,
  BvModalEvent,
} from "bootstrap-vue";

@Component({
  components: { CalendarUnit },
})
export default class Calendar extends Vue {
  //CalendarUnit stuff
  idCounter = 0;
  calendarData: Array<CalendarUnitT> = [
    { day: "SUN", tiles: [], id: this.idCounter++ },
    { day: "MON", tiles: [], id: this.idCounter++ },
    { day: "TUE", tiles: [], id: this.idCounter++ },
    { day: "WED", tiles: [], id: this.idCounter++ },
    { day: "THU", tiles: [], id: this.idCounter++ },
    { day: "FRI", tiles: [], id: this.idCounter++ },
    { day: "SAT", tiles: [], id: this.idCounter++ },
  ];

  //Modal stuff
  active = {
    edit: false,
    unitId: -1,
    tileId: -1,
  };
  inputModel = new String("");
  title = new String("");
  selectedColorModel = {
    color: "green",
    touched: false,
  };

  selectColor(color: string) {
    this.selectedColorModel.color = color;
    this.selectedColorModel.touched = true;
  }

  modalHideHandles(): void {
    this.selectedColorModel.color = "green";
    this.selectedColorModel.touched = false;

    this.active.edit = false;
    this.active.unitId = -1;
    this.active.tileId = -1;

    this.inputModel = "";
    this.title = "";
  }

  modalOkHandler(): void {
    if (this.active.edit) {
      let editedTile: CalendarUnitTileT;

      for (const unit of this.calendarData)
        for (const tile of unit.tiles)
          if (tile.id === this.active.tileId) editedTile = tile;

      const data: CalendarUnitTileT = {
        todo: `${this.inputModel}`,
        color: this.selectedColorModel.touched
          ? this.selectedColorModel.color
          : editedTile!.color,
        id: editedTile!.id,
      };
      const unit: CalendarUnit = this.$refs[`unit${this.active.unitId}`][0];
      const tile: CalendarTile = unit.$refs[`tile${this.active.tileId}`][0];
      tile.editTile(data);
    } else {
      const unit: CalendarUnit = this.$refs[`unit${this.active.unitId}`][0];

      const data: CalendarUnitTileT = {
        todo: `${this.inputModel}`,
        color: this.selectedColorModel.color,
        id: Math.random(),
      };

      unit.addTile(data);
    }
  }

  editOpen(tileInfo: CalendarUnitTileT): void {
    let unitId = -1;

    for (const unit of this.calendarData)
      for (const tile of unit.tiles)
        if (tile.id === tileInfo.id) unitId = unit.id;

    this.active.tileId = tileInfo.id;
    this.active.unitId = unitId;
    this.active.edit = true;

    this.title = `Editando '${tileInfo.todo}'`;
    this.inputModel = tileInfo.todo;

    this.$bvModal.show("calendar-modal");
  }

  addOpen(unitId: number): void {
    const index = this.calendarData.findIndex((el) => el.id === unitId);

    this.active.unitId = unitId;
    this.active.edit = false;

    this.title = `Adicionar 'todo' em ${this.calendarData[index].day}`;
    this.inputModel = "";

    this.$bvModal.show("calendar-modal");
  }
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

.btn-group {
  width: 100%;
}

.btn-group > button {
  font-size: 3vh;
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
