<template>
  <div id="root" :style="{ 'background-color': tile.color }">
    <p style="display: block; color: whitesmoke;">{{ tile.todo }}</p>
    <div class="tile-opt">
      <b-button variant="none" @click="openModal">
        <span class="material-icons" style="font-size: 30px;">
          edit
        </span>
      </b-button>
      <b-button variant="none" @click="deleteTile">
        <span class="material-icons" style="font-size: 30px;">
          delete
        </span>
      </b-button>
    </div>
    <b-modal
      :id="`tile${tile.id}`"
      @hide="modalHideHandler"
      @ok="editTile"
      centered
      size="lg"
      static
      lazy
      button-size="lg"
    >
      <template v-slot:modal-title>
        <h2>Editar '{{ tile.todo }}'</h2>
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
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import {
  BModal,
  VBModal,
  BButton,
  BFormInput,
  BButtonGroup,
  BvModalEvent,
} from "bootstrap-vue";

import CalendarTileT from "../models/CalendarTile";

@Component({
  components: {},
})
export default class CalendarTile extends Vue {
  @Prop() tile!: CalendarTileT;

  inputModel = new String("");
  selectedColor = {
    color: "green",
    touched: false,
  };

  openModal(): void {
    this.$bvModal.show(`tile${this.tile.id}`);
    this.inputModel = this.tile.todo;
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

  editTile(e: BvModalEvent) {
    this.tile.todo = `${this.inputModel}`;
    this.tile.color = this.selectedColor.touched
      ? this.selectedColor.color
      : this.tile.color;
  }

  deleteTile(): void {
    this.$emit("deleteTile", this.tile.id);
  }
}
</script>

<style scoped>
#root {
  overflow: hidden;
  color: black;
}

#root > p {
  font-size: 30px;
}

.btn-group {
  width: 100%;
}

.btn-group > button {
  font-size: 3vh;
}

.tile-opt {
  width: 100%;
}

.tile-opt > button {
  border: none;
  box-shadow: none;
  width: 50%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
}
</style>
