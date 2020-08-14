<template>
  <div id="root">
    <div id="title">
      <p>{{ info.day }}</p>
      <button id="add-btn" @click="openModal">
        <span class="material-icons md-50 white">
          add_circle_outline
        </span>
      </button>
    </div>
    <div id="body">
      <CalendarTile
        :ref="`tile${tile.id}`"
        v-for="tile in this.info.tiles"
        :key="tile.id"
        class="tile"
        :tile="tile"
        :parentId="info.id"
        @editModal="passOn"
        @deleteTile="deleteTile"
      ></CalendarTile>
    </div>
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

  passOn(e: CalendarUnitTileT) {
    const data: CalendarUnitTileT = { todo: e.todo, color: e.color, id: e.id };
    this.$emit("editModal", data);
  }

  openModal(): void {
    this.$emit("addModal", this.info.id);
  }

  addTile(tileInfo: CalendarUnitTileT) {
    this.info.tiles.push(tileInfo);
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
