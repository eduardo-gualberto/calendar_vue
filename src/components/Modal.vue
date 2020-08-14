<template>
  <div></div>
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
import CalendarTile from "../models/CalendarTile";

export default class Modal extends Vue {
  title = "";
  inputPlaceholder = "";
  tileInfo = {
    todo: "",
    color: "",
    id: -1,
  };
  editMode!: boolean;

  inputModel = new String("");
  selectedColor = {
    color: "green",
    touched: false,
  };

  openModal(
    title: string,
    inputPlaceholder: string,
    tileInfo: CalendarTile,
    editMode: boolean
  ): boolean {
    this.title = title;
    this.inputPlaceholder = inputPlaceholder;
    this.tileInfo = tileInfo;
    this.editMode = editMode;

    this.$bvModal.show("calendar-modal");
    return true;
  }

  closeModal(): void {
    this.$bvModal.hide("calendar-modal");
  }

  selectColor(color: string): void {
    this.selectedColor.touched = true;
    this.selectedColor.color = color;
  }

  // modalHideHandler(): void {
  //   this.selectedColor.touched = false;
  //   this.selectedColor.color = "green";
  //   this.inputModel = "";
  // }

  modalOkHandler(e: BvModalEvent): void {
    const todo = `${this.inputModel}`;
    const id = this.editMode ? this.tileInfo.id : Math.random();
    let color: string;
    if (this.editMode) {
      color = this.selectedColor.touched
        ? this.selectedColor.color
        : this.tileInfo.color;
      const edited: CalendarTile = { todo, id, color };
      this.$emit("editTile", edited);
    } else {
      color = this.selectedColor.color;
      const added: CalendarTile = { todo, id, color };
      this.$emit("addTile", added);
    }
  }
}
</script>

<style scoped>
.btn-group {
  width: 100%;
}

.btn-group > button {
  font-size: 3vh;
}
</style>
