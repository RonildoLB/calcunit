<template>
  <div class="div_col">

    <div class="div_col">    
        <label :id="this.id+'lbl_calc'" class="lbl_calc font-segoe"> {{total}} </label>

        <input 
            :id="this.id+'ipt_calc'" 
            type="number" 
            step="any" 
            class="inpt_calc form-control" 
            v-model="number"
            dir="ltr" 
            onfocus="this.scrollLeft = this.scrollWidth;"
        />
    </div>

    <div class="div_col">
        <div class="div_row">
            <button class="btn btn-blue" @click="clear()">
                C
            </button>
            <button class="btn btn-blue" @click="brackets()">
                (<sub v-if="countBrackets != 0" style="font-size: 8pt">{{countBrackets}}</sub> )
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
        countBrackets: 0,
        calcParc: 0,
        calcTotal: 0,
        caixa: []
    }
  },
  methods: {
    addNum(num) {
        this.resultClear()

        let texto = document.getElementById(this.id+'ipt_calc')
        
        if(num === ',' || num === '.') {
            if(!this.number.toString().includes(',') && !this.number.toString().includes('.')) {
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
        this.resultClear()
        let texto = document.getElementById(this.id+'ipt_calc')

        if(isNaN(this.caixa[this.caixa.length-1]) && this.caixa[this.caixa.length-1] != ")" && this.number === "") {
            this.total = this.total + '('
            this.caixa.push('(')
            this.countBrackets++
        }
        else {
            if(this.countBrackets > 0) {
                if(this.caixa[this.caixa.length-1] != ")") {
                    let numero = this.number.toString().replace(".", ",")
                    this.caixa.push(parseFloat(this.number))
                    this.caixa.push(')')

                    if(this.number < 0){
                        this.total = this.total + '(' + numero + ')' + ')'
                    }
                    else {
                        this.total = this.total + numero + ')'
                    }

                    this.countBrackets--

                    let texto = document.getElementById(this.id+'ipt_calc')
                    texto.placeholder = this.calcParcial()
                    this.number = ""
                    texto.focus()
                } else {
                    this.caixa.push(')')
                    this.total = this.total + ')'

                    this.countBrackets--

                    texto.placeholder = this.calcParcial()
                    this.number = ""
                }
            }
        }

        texto.focus()

        let label = document.getElementById(this.id+'lbl_calc')
        let wait = setTimeout(() => {
            label.scrollLeft = label.scrollWidth;
        }, 0);
    },
    includesNumber(signal) {
        this.resultClear()

        if(this.number != "") {
            if(this.caixa[this.caixa.length-1] != ")") {
                let numero = this.number.toString().replace(".", ",")
                this.caixa.push(parseFloat(this.number))
                this.caixa.push(signal)

                if(this.number < 0){
                    this.total = this.total + '(' + numero + ')' + signal
                }
                else {
                    this.total = this.total + numero + signal
                }
            } else {
                this.caixa.push(signal)
                this.total = this.total + signal
            }
        } else {
            if(this.total != "") {
                if(this.caixa[this.caixa.length-1] != "("  && this.caixa[this.caixa.length-1] != ")") {
                    this.total = this.total.toString().slice(0, -1) + signal
                    this.caixa.pop()
                    this.caixa.push(signal)
                }
                if(this.caixa[this.caixa.length-1] == ")") {
                    this.total = this.total + signal
                    this.caixa.push(signal)
                }
            }
        }

        let texto = document.getElementById(this.id+'ipt_calc')
        texto.placeholder = this.calcParcial()
        this.number = ""
        texto.focus()

        let label = document.getElementById(this.id+'lbl_calc')
        let wait = setTimeout(() => {
            label.scrollLeft = label.scrollWidth;
        }, 0);
    },
    clear() {
        let texto = document.getElementById(this.id+'ipt_calc')
        texto.value = ""
        texto.placeholder = ""
        this.number = ""
        this.total = ""
        this.caixa = []
        this.countBrackets = 0
        texto.focus()
    },
    negative() {
        this.resultClear()

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
        let num = ""
        for(let i = this.caixa.length-1; i >= 0; i--) {
            if(!isNaN(this.caixa[i])) {
                num = this.caixa[i]
                break
            }
        }
        return num.toString()
    },
    result() {
        if(this.countBrackets == 0) {
            if(this.total[this.total.length-1] == ')' && this.number !== "") {
                let total = this.calcResult()
                this.number = eval(total)
                this.selected = true
            } else {
                if(this.number !== "" && (this.total[this.total.length-1] == '+' ||
                                          this.total[this.total.length-1] == '-' ||
                                          this.total[this.total.length-1] == '*' ||
                                          this.total[this.total.length-1] == '/' ||
                                          this.total[this.total.length-1] == '^'   )) {
                    this.caixa.push(parseFloat(this.number))
                    let numero = this.number.toString().replace(".", ",")

                    if(this.number < 0){
                        this.total = this.total + '(' + numero + ')'
                    }
                    else {
                        this.total = this.total + numero
                    }
                }
                let total = this.calcResult()
                this.number = eval(total)
                this.selected = true
            }
        }

        let label = document.getElementById(this.id+'lbl_calc')
        let wait = setTimeout(() => {
            label.scrollLeft = label.scrollWidth;
        }, 0);
    },
    resultClear() {
        if(this.selected == true) {
            let texto = document.getElementById(this.id+'ipt_calc')
            this.total = ""
            this.caixa = []
            this.countBrackets = 0
            texto.focus()
            this.selected = false
        }
    },
    calcResult() {
        let total = ""
        let caixa2 = this.caixa.slice()

        total = this.calcString(caixa2)
        console.log(total)
        return total
    },
    calcString(caixa) {
        let nbrackets = 0
        let hbrackets = []
        let str = ""

        for(let n = 0; n <= (caixa.length-1); n++) {
            if(caixa[n] == "(") {
                nbrackets ++
                hbrackets.push([nbrackets, n])
            }

            if(caixa[n] == ")") {
                hbrackets.push([nbrackets, n])
                nbrackets --   
            }

            if(caixa[n] == "^") {
                if(caixa[n-1] == ")") {
                    let cbrackets = 0
                    for (let c = (n-1); c >= 0; c--) {
                        if(caixa[c] == ")") {
                            cbrackets++
                        }

                        if(caixa[c] == "(") {
                            cbrackets--
                            if(cbrackets == 0) {
                                if(caixa[n+1] == "(") {

                                    let dbrackets = 0
                                    for (let d = (n+1); d <= (caixa.length-1); d++) {
                                        if(caixa[d] == "(") {
                                            dbrackets++
                                        }

                                        if(caixa[d] == ")") {
                                            dbrackets--
                                            if(dbrackets == 0) {
                                                caixa.splice(c, d+1, "Math.pow("+ this.calcString(caixa.slice(c+1, n-1))+ ","+ this.calcString(caixa.slice(n+2, d))+ ")")
                                                n = 0
                                            }
                                        }
                                    }

                                }
                                else {
                                    caixa.splice(c, n+2, "Math.pow("+ this.calcString(caixa.slice(c+1, n-1))+ ","+ caixa[n+1]+ ")")
                                    n = 0
                                }
                            }
                        }
                    }
                }
                else {
                    if(caixa[n+1] == "(") {
                        let cbrackets = 0
                        for (let c = (n+1); c <= (caixa.length-1); c++) {
                            if(caixa[c] == "(") {
                                cbrackets++
                            }

                            if(caixa[c] == ")") {
                                cbrackets--
                                if(cbrackets == 0) {
                                    caixa.splice(n-1, c+1, "Math.pow("+ caixa[n-1]+ ","+ this.calcString(caixa.slice(n+2, c))+ ")")
                                    n = 0
                                }
                            }
                        }
                    }
                    else {
                        caixa.splice(n-1, 3, "Math.pow("+ caixa[n-1]+ ","+ caixa[n+1]+ ")")
                        n = 0
                    }
                }
            }
        }
        str = caixa.join("")
        return str
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
    overflow-x: scroll;
    white-space: nowrap;
    scroll-behavior: smooth;
    color: #000a !important;
    text-align: right;
    font-weight: 500;
    font-size: 16pt;
    width: 0rem;
    min-width: 100%;
    text-align: right !important;
    transition: 0ms !important;
}
.lbl_calc::-webkit-scrollbar {
    height: 5px;
}
.lbl_calc::-webkit-scrollbar-track {
    opacity: 0;
}
.lbl_calc::-webkit-scrollbar-thumb {
    background-color: rgba(54, 54, 54, 0.7);
    border-radius: 20px;
    background-clip: content-box;
    border: solid 0.05rem transparent;
}

.inpt_calc {
    margin: 0 0 0.5rem 0;
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