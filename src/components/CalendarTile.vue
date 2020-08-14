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
  @Prop() parentId!: number;

  openModal(): void {
    this.$emit("editModal", this.tile);
  }

  editTile(edited: CalendarTileT): void {
    this.tile.color = edited.color;
    this.tile.todo = edited.todo;
  }

  deleteTile() {
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
