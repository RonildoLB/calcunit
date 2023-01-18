<template>
  <div class="content">
    <div style="margin: auto">
      <div class="content div_col">
        <div class="div_col" style="margin: auto;">
          <div class="div_row center">
            <div class="slctColor yellow" @click="changeColor(1)"></div>
            <div class="slctColor green" @click="changeColor(2)"></div>
            <div class="slctColor pink" @click="changeColor(3)"></div>
            <div class="slctColor purple" @click="changeColor(4)"></div>
            <div class="slctColor blue" @click="changeColor(5)"></div>
            <div class="slctColor gray" @click="changeColor(6)"></div>
          </div>

          <div class="div_row">
            <div class="back-glass" :class="active">
              <button @click="addBox(1)" class="center-h btn-glass">
                <NoteSVG class="icon-btn"/>
              </button>
            </div>

            <div class="back-glass" :class="active">
              <button @click="addBox(2)" class="center-h btn-glass">
                <CalendarSVG class="icon-btn"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="flex-wrap: wrap" class="div_row center">
        <div v-for="(box, index) of boxes" :key="index">
          <div v-if="box.id" class="component" :class="active">
            <div class="content" style="justify-content: flex-end">
              <div @click="remove(box.id)" class="center-h btn-card">
                <FecharSVG />
              </div>
            </div>
            <div class="interno">
              <AddNote v-if="box.type == '1'" :id="box.id" />
              <DiffDate v-if="box.type == '2'" :id="box.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiffDate from '../components/DiffDate.vue'
import AddNote from '../components/AddNote.vue'
import CalendarSVG from '../svg/calendar.vue'
import NoteSVG from '../svg/notes.vue'
import FecharSVG from '../svg/fechar.vue'
export default {
  components: {
    DiffDate,
    AddNote,
    CalendarSVG,
    NoteSVG,
    FecharSVG,
  },
  data() {
    return {
      boxes: [],
      active: 'yellow',
      count: 0,
    }
  },
  methods: {
    addBox(type) {
      this.count++
      this.boxes.push({
        id: this.count,
        type: type,
      })
    },
    remove(id) {
      this.boxes[this.boxes.findIndex(obj => obj.id == id)] = {}
    },
    changeColor(color) {
      switch (color) {
        case 1:
          this.active = 'yellow'
          break
        case 2:
          this.active = 'green'
          break
        case 3:
          this.active = 'pink'
          break
        case 4:
          this.active = 'purple'
          break
        case 5:
          this.active = 'blue'
          break
        case 6:
          this.active = 'gray'
          break
      }
    },
  },
  mounted() {},
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
.slctColor {
  width: 100%;
  height: 1rem
}
.center-h {
  display: flex;
  align-items: center;
}
.content {
  display: flex;
  width: 100%;
}
.btn-glass {
  height: 100%;
  padding: 0.75rem;
  background: linear-gradient(
    180deg,
    rgba(235, 248, 242, 0.54) 0%,
    rgba(243, 248, 255, 0.15) 20%,
    rgba(232, 232, 232, 0.41) 83%,
    rgba(255, 255, 255, 0.55) 100%
  );
  border: 2.5px solid #fafafa60;
  box-shadow: 0 0 8px rgb(10 10 10 / 20%);
  cursor: pointer;
  border-radius: 3px 3px 0.5em 0.5em;
}
.btn-glass:hover {
  height: 100%;
  padding: 0.75rem;
  background: linear-gradient(
    180deg,
    rgba(235, 248, 242, 0.45) 0%,
    rgba(243, 248, 255, 0.05) 20%,
    rgba(232, 232, 232, 0.12) 83%,
    rgba(255, 255, 255, 0.45) 100%
  );
  border: 2.5px solid #fafafa60;
  box-shadow: 0 0 6px rgb(10 10 10 / 20%);
  cursor: pointer;
  border-radius: 3px 3px 0.5em 0.5em;
}
.btn-glass:hover .icon-btn {
  background: radial-gradient(circle, rgba(247,247,247,0.25) 0%, rgba(255,255,255,0) 100%);
}
.btn-glass:active {
  height: 100%;
  padding: 0.75rem;
  background: linear-gradient(
    180deg,
    rgba(235, 248, 242, 0.35) 0%,
    rgba(243, 248, 255, 0.05) 20%,
    rgba(232, 232, 232, 0.10) 83%,
    rgba(255, 255, 255, 0.40) 100%
  );
  border: 2.5px solid #fcfefc70;
  box-shadow: 0 0 2px rgb(10 10 10 / 20%);
  cursor: pointer;
  border-radius: 3px 3px 0.5em 0.5em;
  transform: scale(0.98)
}
.btn-glass:active .icon-btn {
  background: transparent;
}

.back-glass {
  margin: 1px;
  border-radius: 0 0 0.5em 0.5em;
}
.icon-btn {
  background: radial-gradient(circle, rgba(247,247,247,0.5) 0%, rgba(255,255,255,0) 100%);
}
.btn-card {
  display: flex;
  justify-content: center;
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  background: radial-gradient(#00000025, #0000, #0000);
  cursor: pointer;
}
.btn-card > svg {
  fill: #00000080;
}

</style>
