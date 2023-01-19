<template>
  <div class="content">
    <div style="margin: auto; width: 100%">
      <div class="content div_col" style="background-color: #c9c8c8; padding-bottom: 0.5rem;">
        <div class="div_col" style="margin: auto">
          <div class="div_row center">
            <div class="slctColor border-left border-right border-right yellow" @click="changeColor(1)"></div>
            <div class="slctColor border-left border-right green" @click="changeColor(2)"></div>
            <div class="slctColor border-left border-right pink" @click="changeColor(3)"></div>
            <div class="slctColor border-left border-right purple" @click="changeColor(4)"></div>
            <div class="slctColor border-left border-right blue" @click="changeColor(5)"></div>
            <div class="slctColor border-left border-right gray" @click="changeColor(6)"></div>
          </div>

          <div :class="active" class="border-right border-left" style="height: 0.5rem; width: 100%"></div>

          <div class="div_row">
            <div class="back-glass border-left border-right" :class="active">
              <button @click="addBox(1)" class="center-h btn-glass">
                <img src="img\bloco-de-notas.png" class="icon-btn" width="40" height="40" />
              </button>
            </div>

            <div class="back-glass border-right" :class="active">
              <button @click="addBox(2)" class="center-h btn-glass">
                <img src="img\data-limite.png" class="icon-btn" width="40" height="40" />
              </button>
            </div>

            <div class="back-glass border-right" :class="active">
              <button @click="addBox(3)" class="center-h btn-glass" disabled>
                <img src="img\calculadora.png" class="icon-btn" width="40" height="40" />
              </button>
            </div>

            <div class="back-glass border-right" :class="active">
              <button @click="addBox(4)" class="center-h btn-glass">
                <img src="img\velocimetro.png" class="icon-btn" width="40" height="40" />
              </button>
            </div>

            <div class="back-glass border-right" :class="active">
              <button @click="addBox(5)" class="center-h btn-glass">
                <img src="img\angulo.png" class="icon-btn" width="40" height="40" />
              </button>
            </div>

            <div class="back-glass border-right" :class="active">
              <button @click="addBox(6)" class="center-h btn-glass">
                <img src="img\temperatura.png" class="icon-btn" width="40" height="40" />
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
              <ConvSpeed v-if="box.type == '4'" :id="box.id" />
              <ConvAngle v-if="box.type == '5'" :id="box.id" />
              <ConvTemp v-if="box.type == '6'" :id="box.id" />
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
import ConvSpeed from '../components/ConvSpeed.vue'
import ConvAngle from '../components/ConvAngle.vue'
import ConvTemp from '../components/ConvTemp.vue'
import FecharSVG from '../svg/fechar.vue'

export default {
  components: {
    DiffDate,
    AddNote,
    ConvSpeed,
    ConvAngle,
    ConvTemp,
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
  margin: 0.75rem;
  box-shadow: 0px 4px 4px 1px #00000025;
}
.interno {
  padding: 0.75rem;
  border: dashed 1px #aaaa;
}
.border-right {
  border-right: 1px solid #0002;
}
.border-left {
  border-left: 1px solid #0002;
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
  height: 1.5rem;
  cursor: pointer;
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
  margin: 0 1px;
  height: 100%;
  padding: 0.75rem;
  background: transparent;
  border: 2px solid #fafafa60;
  box-shadow: 0 0 7px rgb(10 10 10 / 25%);
  cursor: pointer;
  border-radius: 0.5em;
}
.btn-glass:hover {
  background: linear-gradient(
    165deg,
    rgba(235, 248, 242, 0.54) 0%,
    rgba(243, 248, 255, 0.15) 20%,
    rgba(232, 232, 232, 0.41) 83%,
    rgba(255, 255, 255, 0.55) 100%
  );
  box-shadow: 0 0 7px rgb(10 10 10 / 25%);
}
.btn-glass:hover .icon-btn {
  background: radial-gradient(circle, rgba(247, 247, 247, 0.25) 0%, rgba(255, 255, 255, 0) 100%);
}
.btn-glass:active {
  background: linear-gradient(
    180deg,
    rgba(235, 248, 242, 0.35) 0%,
    rgba(243, 248, 255, 0.05) 20%,
    rgba(232, 232, 232, 0.1) 83%,
    rgba(255, 255, 255, 0.4) 100%
  );
  border: 2px solid #fcfefc70;
  box-shadow: 0 0 2px rgb(10 10 10 / 20%);
  transform: scale(0.95);
}
.btn-glass:active .icon-btn {
  background: transparent;
}

.back-glass {
  border-radius: 0 0 0.5em 0.5em;
}
.icon-btn {
  background: radial-gradient(circle, rgba(247, 247, 247, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
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
