<template>
  <div class="content">
    <div style="margin: auto;">
      <div class="menu-base div_row" style="position: relative; z-index: 2147483647;">
        <div id="menu-logo" class="menu-comp center" style="width: 100%;">
          <CalcUnit id="logo"/>
        </div>

        <div id="menu-center" class="menu-comp">
          <div id="menu" class="menu div_col">
            <div class="div_col" style="margin: auto">
              <div class="div_row center" style="width: 400px;">
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
                    <button @click="addBox(1)" class="center-v btn-glass">
                      <img src="img\bloco-de-notas.png" class="icon-btn" width="40" height="40" draggable="false"/>
                    </button>
                  </div>

                  <div class="back-glass border" :class="active">
                    <button @click="addBox(2)" class="center-v btn-glass">
                      <img src="img\data-limite.png" class="icon-btn" width="40" height="40" draggable="false"/>
                    </button>
                  </div>

                  <div class="back-glass border" :class="active">
                    <button @click="addBox(3)" class="center-v btn-glass">
                      <img src="img\calculadora.png" class="icon-btn" width="40" height="40" draggable="false"/>
                    </button>
                  </div>

                  <div class="back-glass border" :class="active">
                    <button @click="addBox(4)" class="center-v btn-glass">
                      <img src="img\velocimetro.png" class="icon-btn" width="40" height="40" draggable="false"/>
                    </button>
                  </div>

                  <div class="back-glass border" :class="active">
                    <button @click="addBox(5)" class="center-v btn-glass">
                      <img src="img\angulo.png" class="icon-btn" width="40" height="40" draggable="false"/>
                    </button>
                  </div>

                  <div class="back-glass border" :class="active">
                    <button @click="addBox(6)" class="center-v btn-glass">
                      <img src="img\temperatura.png" class="icon-btn" width="40" height="40" draggable="false"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="menu-imagens" class="div_col menu-comp center" style="width: 100%;">
          <div class="div_row center" style="flex-wrap: wrap">
          <img class="menu-img" src="img\background1.png" width="50" height="50" @click="changeImage(1)">
          <img class="menu-img" src="img\background2.png" width="50" height="50" @click="changeImage(2)">
          <img class="menu-img" src="img\background3.png" width="50" height="50" @click="changeImage(3)">
          <img class="menu-img" src="img\background4.png" width="50" height="50" @click="changeImage(4)">
          <img class="menu-img" src="img\background6.png" width="50" height="50" @click="changeImage(6)">
          <img class="menu-img" src="img\background9.png" width="50" height="50" @click="changeImage(9)">
          <div style="position: relative">
            <BucketSVG style="position: absolute; pointer-events: none; opacity: 0.5; padding:0.75rem"/>
            <input type="color" class="inpt-color" @input="inptColor()" v-model="colorBG"/>
            
          </div>
          </div>
        </div>
      </div>
      

      <div style="min-width: 100vw; flex-wrap: wrap; position: relative; padding-top: 0.5rem" 
      class="div_row center-h">
        <div v-for="(box, index) of boxes" :key="index">
          <div v-if="box.id" class="component" :class="box.color">
            <div class="content" style="justify-content: flex-end">
              <div @click="changeColor(box)" class="center-v btn-card">
                <PaletaSVG />
              </div>
              <div @click="remove(box.id)" class="center-v btn-card card-close" style="margin-left: 0.2rem">
                <FecharSVG />
              </div>
            </div>
            <div class="interno">
              <AddNote v-if="box.type == '1'" :id="box.id" />
              <DiffDate v-if="box.type == '2'" :id="box.id"/>
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
import CalcUnit from '../../svg/calcunit.vue'
import BucketSVG from '../../svg/bucket.vue'

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
    CalcUnit,
    BucketSVG
  },
  data() {
    return {
      boxes: [],
      active: 'yellow',
      count: 0,
      colorBG: '#ffffff'
    }
  },
  methods: {
    inptColor() {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = this.colorBG;
    },
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
      if(img === 0 || img === 9) {
        if(img === 9) {
          document.body.style.backgroundImage = `url('img/background${img}.png')`;
          document.getElementById('logo').style.fill = '#fff';
        }
        else {
          document.body.style.backgroundImage = `url('img/background${img}.jpg')`
          document.getElementById('logo').style.fill = '#000';
        }
        document.body.style.backgroundSize = 'unset'
      }
      else {
        document.body.style.backgroundImage = `url('img/background${img}.png')`;
        document.body.style.backgroundSize = '100px';
        document.getElementById('logo').style.fill = '#000';
      }
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