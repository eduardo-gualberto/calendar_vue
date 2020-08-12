<template>
  <div id="root">
    <div id="title">
      <p>{{ info.day }}</p>
      <button id="add-btn" @click="openModal()">
        <span class="material-icons md-50 white">
          add_circle_outline
        </span>
      </button>
    </div>
    <div id="body">
      <CalendarTile
        v-for="tile in this.info.tiles"
        :key="tile.id"
        class="tile"
        :tile="tile"
        @deleteTile="deleteTile"
      ></CalendarTile>
    </div>
    <b-modal
      :id="`unit${info.id}`"
      centered
      size="lg"
      static
      lazy
      @hide="modalHideHandler"
      @ok="addTile"
      button-size="lg"
    >
      <template v-slot:modal-title>
        <h2>Adicionar 'todo' em {{ info.day }}</h2>
      </template>
      <div class="modal-body">
        <label for="modal-input">Qual o novo 'todo'?</label>
        <b-form-input
          autofocus
          ref="inputModal"
          id="modal-input"
          name="modal-input"
          v-model="inputModel"
          placeholder="input no body do modal"
        />

        <label for="" style="margin-top: 20px;"
          >Qual a cor do novo 'todo'?</label
        >
        <b-button-group class="btn-group" size="sm">
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
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import CalendarUnitT from "../models/CalendarUnit";
import CalendarUnitTileT from "../models/CalendarTile";
import VModal from "vue-js-modal";
import CalendarTile from "./CalendarTile.vue";
import {
  BModal,
  VBModal,
  BButton,
  BFormInput,
  BButtonGroup,
  BvModalEvent,
} from "bootstrap-vue";
@Component({
  components: { CalendarTile },
})
export default class CalendarUnit extends Vue {
  created() {
    this.info.tiles = [];
  }

  @Prop() info!: CalendarUnitT;
  inputModel = new String("");
  selectedColor = {
    color: "green",
    touched: false,
  };
  idCount = 0;

  public readonly $refs!: {
    inputModal: HTMLInputElement;
  };

  openModal(): void {
    this.$bvModal.show(`unit${this.info.id}`);
  }

  selectColor(color: string): void {
    this.selectedColor.touched = true;
    this.selectedColor.color = color;
  }

  modalHideHandler(): void {
    this.selectedColor.touched = false;
    this.selectedColor.color = "green";
    this.inputModel = "";
  }

  addTile(e: BvModalEvent) {
    if (this.inputModel == "") {
      e.preventDefault();
      return;
    }
    const newT: CalendarUnitTileT = {
      todo: `${this.inputModel}`,
      color: this.selectedColor.color,
      id: this.idCount++,
    };
    this.info.tiles.push(newT);
  }

  deleteTile(tileId: number) {
    const index = this.info.tiles.findIndex((el) => el.id === tileId);
    this.info.tiles.splice(index, 1);
  }
}
</script>

<style scoped>
button:focus {
  outline: none;
}

#root {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  border-radius: 10px;
  overflow: hidden;
}

#title {
  background-color: rgb(41, 39, 39);
  height: auto;
  color: whitesmoke;
  font-size: 2em;
  display: flex;
}

#title > p {
  margin: auto;
  flex-grow: 1;
}

#body {
  background-color: rgb(68, 64, 64);
  height: 30vh;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-wrap: nowrap;
}

#add-btn {
  background: transparent;
  border: none;
  text-align: right;
  border-radius: 50%;
  opacity: 0.5;
  margin: 1vw;
}

#add-btn:focus {
  outline: none;
}

.md-50 {
  font-size: 50px;
}

.white {
  color: whitesmoke;
}

.btn-group {
  width: 100%;
}

.btn-group > button {
  font-size: 3vh;
}

.tile {
  line-height: 30px;
  height: auto;
  text-align: center;
  width: 100%;
  font-size: 25px;
  border-radius: 10px;
  flex-shrink: 0;
  margin: 2px 0;
  color: white;
}
</style>
