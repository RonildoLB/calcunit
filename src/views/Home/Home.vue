<template>
  <div class="content">
    <div style="margin: auto;">
      <div class="div_row center" style="margin-bottom: 0.5rem">
        <div id="menu" class="menu div_col">
          <div class="div_col" style="margin: auto">
            
            <div class="div_row center" style="width: 400px">
              <div class="slctColor border-color yellow" :class="{ transform: active == 'yellow' }" @click="changeColorActive('yellow')"></div>
              <div class="slctColor border-color green" :class="{ transform: active == 'green' }" @click="changeColorActive('green')"></div>
              <div class="slctColor border-color pink" :class="{ transform: active == 'pink' }" @click="changeColorActive('pink')"></div>
              <div class="slctColor border-color purple" :class="{ transform: active == 'purple' }" @click="changeColorActive('purple')"></div>
              <div class="slctColor border-color blue" :class="{ transform: active == 'blue' }" @click="changeColorActive('blue')"></div>
              <div class="slctColor border-color gray" :class="{ transform: active == 'gray' }" @click="changeColorActive('gray')"></div>
            </div>
          </div>

          <hr style="margin: 10px 0; border-color: #fff; opacity: 1">

          <div class="div_row">
            <div class="div_col" style="margin: auto">
              <div class="div_row">
                <div class="back-glass border" :class="active">
                  <button @click="addBox(1)" class="center-h btn-glass">
                    <img src="img\bloco-de-notas.png" class="icon-btn" width="40" height="40" draggable="false"/>
                  </button>
                </div>

                <div class="back-glass border" :class="active">
                  <button @click="addBox(2)" class="center-h btn-glass">
                    <img src="img\data-limite.png" class="icon-btn" width="40" height="40" draggable="false"/>
                  </button>
                </div>

                <div class="back-glass border" :class="active">
                  <button @click="addBox(3)" class="center-h btn-glass">
                    <img src="img\calculadora.png" class="icon-btn" width="40" height="40" draggable="false"/>
                  </button>
                </div>

                <div class="back-glass border" :class="active">
                  <button @click="addBox(4)" class="center-h btn-glass">
                    <img src="img\velocimetro.png" class="icon-btn" width="40" height="40" draggable="false"/>
                  </button>
                </div>

                <div class="back-glass border" :class="active">
                  <button @click="addBox(5)" class="center-h btn-glass">
                    <img src="img\angulo.png" class="icon-btn" width="40" height="40" draggable="false"/>
                  </button>
                </div>

                <div class="back-glass border" :class="active">
                  <button @click="addBox(6)" class="center-h btn-glass">
                    <img src="img\temperatura.png" class="icon-btn" width="40" height="40" draggable="false"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--
        <div class="div_col">
          <div class="menu div_row">
          <img src="img\background1.png" width="50" height="50" @click="changeImage(1)">
          <img src="img\background2.png" width="50" height="50" @click="changeImage(2)">
          <img src="img\background3.png" width="50" height="50" @click="changeImage(3)">
          <img src="img\background4.png" width="50" height="50" @click="changeImage(4)">
          <img src="img\background5.png" width="50" height="50" @click="changeImage(5)">
          <img src="img\background6.png" width="50" height="50" @click="changeImage(6)">
          <img src="img\background7.png" width="50" height="50" @click="changeImage(7)">
          <img src="img\background8.png" width="50" height="50" @click="changeImage(8)">
          <img src="img\background9.png" width="50" height="50" @click="changeImage(9)">
          </div>
        </div>
        -->
      </div>
      

      <div style="min-width: 100vw; flex-wrap: wrap; position: relative" class="div_row center">
        <div v-for="(box, index) of boxes" :key="index">
          <div v-if="box.id" class="component" :class="box.color">
            <div class="content" style="justify-content: flex-end">
              <div @click="changeColor(box)" class="center-h btn-card">
                <PaletaSVG />
              </div>
              <div @click="remove(box.id)" class="center-h btn-card card-close" style="margin-left: 0.2rem">
                <FecharSVG />
              </div>
            </div>
            <div class="interno">
              <AddNote v-if="box.type == '1'" :id="box.id" />
              <DiffDate v-if="box.type == '2'" :id="box.id" />
              <Calculator v-if="box.type == '3'" :id="box.id" />
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
import DiffDate from '../../components/DiffDate.vue'
import AddNote from '../../components/AddNote.vue'
import Calculator from '../../components/Calculator.vue'
import ConvSpeed from '../../components/ConvSpeed.vue'
import ConvAngle from '../../components/ConvAngle.vue'
import ConvTemp from '../../components/ConvTemp.vue'
import FecharSVG from '../../svg/fechar.vue'
import PaletaSVG from '../../svg/paleta.vue'

export default {
  components: {
    DiffDate,
    AddNote,
    Calculator,
    ConvSpeed,
    ConvAngle,
    ConvTemp,
    FecharSVG,
    PaletaSVG,
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
        color: this.active
      })
    },
    remove(id) {
      this.boxes[this.boxes.findIndex(obj => obj.id == id)] = {}
    },
    changeColorActive(color) {
      this.active = color
    },
    changeImage(img) {
      document.body.style.backgroundImage = `url('img/background${img}.png')`;
    },
    changeColor(box) {
      switch (box.color) {
        case 'yellow':
          box.color = 'green'
          break
        case 'green':
          box.color = 'pink'
          break
        case 'pink':
          box.color = 'purple'
          break
        case 'purple':
          box.color = 'blue'
          break
        case 'blue':
          box.color = 'gray'
          break
        case 'gray':
          box.color = 'yellow'
          break
      }
    },
  },
  mounted() {},
}
</script>

<style>
@import './Home.css';
</style>