<template>
  <div class="div_col">
    <div class="header">
      <div style="font-size: 1.5rem; display: flex; align-items: center" class="font-segoe">
        <img src="img\temperatura.png" style="margin-right: 0.75rem;" width="40" height="40" />

        <div class="div_col">
          <span style="font-size: 16pt; font-weight: 500;">Conversor de Temperatura</span>

          <span style="font-size: 10pt;">Temperature converter</span>
        </div>
      </div>
    </div>

    <div class="div_col">
      <div>
        <span id="lbl_greatness" class="font-segoe">Celsius:</span>
        <input type="number" v-model="text1" @input="input(1)" class="form-control" placeholder="°C"/>
      </div>

      <div class="div_row" style="width: 100%; position: relative">
        <SwitchVerticalSVG style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);"/>
        <span id="lbl_greatness" class="font-segoe">Fahrenheit:</span>
      </div>

      <div>
        <input type="number" v-model="text2" @input="input(2)" class="form-control" placeholder="°F"/>
      </div>

      <div class="div_row" style="width: 100%; position: relative">
        <SwitchVerticalSVG style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);"/>
        <span id="lbl_greatness" class="font-segoe">Kelvin:</span>
      </div>

      <div>
        <input type="number" v-model="text3" @input="input(3)" class="form-control" placeholder="K"/>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchVerticalSVG from '../svg/switch_vertical.vue'

export default {
  name: 'ConvTemp',
  components: {
    SwitchVerticalSVG
  },
  data() {
    return {
      text1: "",
      text2: "",
      text3: ""
    }
  },
  methods: {
    input(t) {
      console.log(this.text1)
      if (t == 1 && this.text1 === "") {
        this.text2 = ""
        this.text3 = ""
      } else {
        if (t == 2 && this.text2 ===  "") {
          this.text1 = ""
          this.text3 = ""
        } else {
          if (t == 3 && this.text3 ===  "") {
            this.text1 = ""
            this.text2 = ""
          } else {
            if(t == 1) {
              this.text2 = this.text1 * (9 / 5) + 32
              this.text3 = this.text1 + 273.15
            }
            if(t == 2) {
              this.text1 = (this.text2 - 32) * (5 / 9)
              this.text3 = (this.text2 - 32) * (5 / 9) + 273.15
            }
            if(t == 3) {
              this.text2 = (this.text3 - 273.15) * (9 / 5) + 32
              this.text1 = this.text3 - 273.15
            }
          }
        }
      }
    }
  },
  mounted() {
  },
  props: {
    id: Number,
  },
}
</script>
<style>
  input[type=number] {
    background-color: #fff5 !important; 
    color: #000 !important;
    box-shadow: inset 0 0 5px 1px #0001;
    text-align: center;
    font-weight: 500;
    font-size: 20pt;
    width: 15rem;
    min-width: 100%
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  #lbl_greatness {
    padding-top: 1rem;
    padding-bottom: 0.25rem;
    font-size: 9pt;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
  }
</style>