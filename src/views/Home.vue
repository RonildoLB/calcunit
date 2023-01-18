<template>
  <div class="content">
    <div style="margin: auto">
      <div class="content">
        <div class="div_row" style="margin: auto">
          <button @click="addBox(1)" class="center-h btn-glass">
            <NoteSVG/>
          </button>

          <button @click="addBox(2)" class="center-h btn-glass">
            <CalendarSVG/>
          </button>
        </div>
      </div>
      
      <div style="flex-wrap: wrap" class="div_row center">
        <div v-for="(box, index) of boxes" :key="index" >
          <div v-if="box.id" class="component" :class="active">
            <div class="content" style="justify-content: flex-end">
              <div @click="remove(box.id)" class="center-h btn-card">
                <FecharSVG/>
              </div>
            </div>
            <div class="interno">
              <AddNote v-if="box.type=='1'" :id="box.id"/>
              <AddHour v-if="box.type=='2'" :id="box.id"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddHour from '../components/AddHour.vue'
import AddNote from '../components/AddNote.vue'

import CalendarSVG from '../svg/calendar.vue'
import NoteSVG from '../svg/notes.vue'
import FecharSVG from '../svg/fechar.vue'

export default {
  components: { 
    AddHour,
    AddNote,

    CalendarSVG,
    NoteSVG,
    FecharSVG
  },
  data() {
    return {
      boxes: [],
      active: "yellow",
      count: 0
    }
  },
  methods: {
    addBox(type) {
      this.count++

      this.boxes.push({
        id: this.count,
        type: type
      })
    },
    remove(id) {
      this.boxes[this.boxes.findIndex(obj => obj.id == id)] = {}
    },
    changeColor(color) {
      switch (color) {
        case 1:
          this.active = "yellow";
          break;
        case 2:
          this.active = "green";
          break;
        case 3:
          this.active = "pink";
          break;
        case 4:
          this.active = "purple";
          break;
        case 5:
          this.active = "blue";
          break;
        case 6:
          this.active = "gray";
          break;
      }
    }
  },
  mounted() {
  }
}
</script>

<style>
.component {
  background-image: linear-gradient(
    178deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 73%,
    rgba(255, 255, 255, 0.35) 79%
  );
  padding: 0 1rem 1rem 1rem;
  margin: 1rem;
  box-shadow: 0px 4px 4px 1px #00000025;
}
.interno {
  padding: 0.75rem;
  border: dashed 1px #aaaa;
}
.yellow {
  background-color: #fff2ab;
}
.green {
  background-color: #cbf1c4;
}
.pink {
  background-color: #ffcce5;
}
.purple {
  background-color: #e7cfff;
}
.blue {
  background-color: #cde9ff;
}
.gray {
  background-color: #e1dfdd;
}
.center-h {
  display: flex;
  align-items: center
}
.content {
  display: flex;
  width: 100%;
}
.btn-glass {
  background-color: transparent;
  border-color: transparent;
}
.btn-card {
  display: flex;
  justify-content: center;
  border-radius: 100px;
  width: 1rem;
  height: 1rem;
  background: radial-gradient(#00000025,#0000, #0000);
  cursor: pointer;
} .btn-card>svg {
  fill: #00000080;
}
</style>
