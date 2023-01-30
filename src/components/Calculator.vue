<template>
  <div class="div_col">

    <div class="div_col">
        <label class="lbl_calc font-segoe"> {{total}} </label>

        <input 
            :id="this.id+'ipt_calc'" 
            type="number" 
            step="any" 
            class="inpt_calc form-control" 
            v-model="number" 
            dir="ltr" 
            onfocus="this.scrollLeft = this.scrollWidth;" 
            onfocusout="this.scrollLeft = this.scrollWidth;"
        />
    </div>

    <div class="div_col">
        <div class="div_row">
            <button class="btn btn-blue" @click="clear()">
                C
            </button>
            <button class="btn btn-blue" @click="brackets()">
                ( )
            </button>
            <button class="btn btn-blue" @click="operation('^')">
                x<sup><sup> y</sup></sup>
            </button>
            <button class="btn btn-blue div_col" @click="operation('/')">
            <DivSVG/>
            </button>
        </div>

        <div class="div_row">
            <button class="btn btn-blue" @click="addNum(7)">
                7
            </button>
            <button class="btn btn-blue" @click="addNum(8)">
                8
            </button>
            <button class="btn btn-blue" @click="addNum(9)">
                9
            </button>
            <button class="btn btn-blue div_col" @click="operation('*')">
            <MultSVG/>
            </button>
        </div>

        <div class="div_row">
            <button class="btn btn-blue" @click="addNum(4)">
                4
            </button>
            <button class="btn btn-blue" @click="addNum(5)">
                5
            </button>
            <button class="btn btn-blue" @click="addNum(6)">
                6
            </button>
            <button class="btn btn-blue div_col" @click="operation('-')">
            <MinusSVG/>
            </button>
        </div>

        <div class="div_row">
            <div class="div_col">
                <button class="btn btn-blue" @click="addNum(1)">
                    1
                </button>
                <button class="btn btn-blue" @click="negative()">
                    +/-
                </button>
            </div>

            <div class="div_col">
                <button class="btn btn-blue" @click="addNum(2)">
                    2
                </button>
                <button class="btn btn-blue" @click="addNum(0)">
                    0
                </button>
            </div>

            <div class="div_col">
                <button class="btn btn-blue" @click="addNum(3)">
                    3
                </button>
                <button class="btn btn-blue" @click="addNum(',')">
                    ,
                </button>
            </div>
            
            <div class="div_col">
                <button class="btn btn-blue center" @click="operation('+')">
                <PlusSVG/>
                </button>
                <button class="btn btn-light div_col center" @click="result()">
                <EqualsSVG/>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import PlusSVG from '../svg/plus.vue'
import MinusSVG from '../svg/minus.vue'
import MultSVG from '../svg/multiply.vue'
import DivSVG from '../svg/divide.vue'
import EqualsSVG from '../svg/equals.vue'

export default {
  name: 'Calculator',
  components: {
    EqualsSVG,
    DivSVG,
    MultSVG,
    PlusSVG,
    MinusSVG,
  },
  data() {
    return {
        number: "",
        total: "",
        selected: false,
        calcParc: 0,
        calcTotal: 0,
        caixa: []
    }
  },
  methods: {
    addNum(num) {
        if(this.selected == true) {
            this.number = ""
            this.selected = false
        }

        let texto = document.getElementById(this.id+'ipt_calc')
        
        if(num === ',' || num === '.') {
            if(!this.number.includes(',') && !this.number.includes('.')) {
                texto.type = "text"
                texto.value += num.toString()
                this.number += num.toString()
            } 
        }
        else {
            this.number = this.number.toString().replace(",", ".")
            let wait = setTimeout(() => {
                texto.type = "number"
                texto.scrollLeft = texto.scrollWidth;
            }, 0);
            texto.value += num.toString()
            this.number += num.toString()
        }
        texto.focus()
        texto.scrollLeft = texto.scrollWidth;
    },
    operation(op) {
        this.includesNumber(op)
    },
    brackets() {

    },
    includesNumber(signal) {
        if(this.number != "") {
            let numero = this.number.toString().replace(".", ",")
            this.caixa.push(parseFloat(numero))
            this.caixa.push(signal)

            if(this.number < 0){
                this.total = this.total + '(' + numero + ')' + signal
            }
            else {
                this.total = this.total + this.number.toString().replace(".", ",") + signal
            }
        } else {
            if(this.total != "") {
                this.total = this.total.toString().slice(0, -1) + signal
                this.caixa.pop()
                this.caixa.push(signal)
            }
        }

        console.log(this.caixa)

        let texto = document.getElementById(this.id+'ipt_calc')
        texto.placeholder = this.calcParcial()
        this.number = ""
        texto.focus()
        this.selected = true
    },
    clear() {
        let texto = document.getElementById(this.id+'ipt_calc')
        texto.value = ""
        this.number = ""
        this.total = ""
        this.caixa = []
        texto.focus()
    },
    negative() {
        let texto = document.getElementById(this.id+'ipt_calc')
        if(this.number.toString().indexOf("-") != -1) {
            texto.value = texto.value.replace("-", "")
            this.number = texto.value
        } else {
            if(texto.type != 'text') {
                texto.value = "-"+texto.value
                this.number = texto.value
            }
            else {
                this.number = this.number.toString().replace(",", "")
                texto.type = 'number'
                this.number = "-"+this.number
                texto.value = this.number
            }
        }
        texto.scrollLeft = texto.scrollWidth;
    },
    calcParcial() {
                    
        return this.number.toString()
    },
    result() {

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
.lbl_calc {
    color: #000a !important;
    text-align: center;
    font-weight: 500;
    font-size: 16pt;
    width: 0rem;
    min-width: 100%;
    text-align: right !important;
    transition: 0ms !important;
}
.inpt_calc {
    margin: 0.5rem 0;
    background-color: #fff5 !important; 
    color: #000 !important;
    box-shadow: inset 0 0 5px 1px #0001;
    text-align: center;
    font-weight: 500;
    font-size: 20pt !important;
    width: 0rem;
    min-width: 100%;
    text-align: right !important;
    transition: 0ms !important;
}
.inpt_calc:focus {
    box-shadow: inset 0 0 5px 1px #0001 !important;
}
 button {
    font-family: Lato;
    margin: 1px
 }
</style>