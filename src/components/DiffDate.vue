<template>
  <div>
    <div class="div_col">
      <div :id="this.id+'header'" class="headerTime">
        <div style="width: 100%; height: 63px">
          <div style="font-size: 1.5rem; align-items: center; z-index: 2" class="select font-segoe" @click="option()">
            <div class="option div_row center-v">
              <div class="div_row center-v" v-if="type === 1" style="margin-right: 0.5rem;"><DiffDH/></div>
              <div class="div_row center-v" v-if="type === 2" style="margin-right: 0.5rem;"><CalcDH/></div>
              <img src="img/seta-baixo.png" width="20" height="20"/>
            </div>

            <div :id="this.id+'option'" class="select-content" @click="alternate()">
              <CalcDH v-if="type === 1"/>
              <DiffDH v-if="type === 2"/>
            </div>
          </div>
        </div>
        <div>
          <div class="btn-add">
            <button class="btn btn-blue btn-plus" @click="add(this.id)">
              <PlusSVG/>
            </button>
            <button class="btn btn-blue" @click="remove(this.id)">
              <MinusSVG/>
            </button>
          </div>
        </div>
      </div>

      <div :id="this.id+'diffTime'" class="div_col" style="padding-bottom: 1rem;" v-show="type == 1">
        <div class="div_row center">
          <div class="divDiff">
            <input :id="this.id+'date_i0'" type="datetime-local" step="1" class="form-control" />
            <div>&nbsp;-&nbsp;</div>
            <input :id="this.id+'date_f0'" type="datetime-local" step="1" class="form-control" />
          </div>
        </div>
      </div>

      <div :id="this.id+'calcTime'" class="div_col" style="padding-bottom: 1rem;" v-show="type == 2">
        <div class="div_col center">
          <div class="div_row" style="width: 100%; padding: 0 0.25rem">
            <div class="form-text" style="width: 100%;">
              <span class="font-segoe">anos</span>
            </div>
            <div class="form-text" style="width: 100%;">
              <span class="font-segoe">sem</span>
            </div>
            <div class="form-text" style="width: 100%;">
              <span class="font-segoe">dias</span>
            </div>
            <div class="form-text" style="width: 100%;">
              <span class="font-segoe">horas</span>
            </div>
            <div class="form-text" style="width: 100%;">
              <span class="font-segoe">min</span>
            </div>
            <div class="form-text" style="width: 100%;">
              <span class="font-segoe">seg</span>
            </div>
          </div>
          <div class="divCalc">
            <div style="display: flex; flex-wrap: nowrap">
              <div class="form-text">
                <input :id="this.id+'inpt_ano_0'" type="number"/>
              </div>
              <div class="form-text" >
                <input :id="this.id+'inpt_sem_0'" type="number"/>
              </div>
              <div class="form-text" >
                <input :id="this.id+'inpt_dia_0'" type="number"/>
              </div>
            </div>
            <div style="display: flex; flex-wrap: nowrap">
              <div class="form-text" >
                <input :id="this.id+'inpt_hora_0'" type="number"/>
              </div>
              <div class="form-text">
                <input :id="this.id+'inpt_min_0'" type="number" />
              </div>
              <div class="form-text" >
                <input :id="this.id+'inpt_seg_0'" type="number"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="div_row">
      <div class="div_col">
        <span id="lbl_total" class="font-segoe">Total:</span>
        <button id="btn_total" class="btn btn-blue" @click="calc(this.id)"><EqualsSVG/></button>
      </div>
      <div class="div_row" style="width: 100%; justify-content: center; flex-wrap: wrap">
        <div class="div_col displayTime">
          <span class="lbl_value">{{ anos.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}</span>
          <span class="lbl_periodo">anos</span>
          <input :id="this.id+'chk_ano'" type="checkbox" checked />
        </div>

        <div class="div_col displayTime">
          <span class="lbl_value">{{ semanas.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}</span>
          <span class="lbl_periodo">sem</span>
          <input :id="this.id+'chk_sem'" type="checkbox" checked />
        </div>

        <div class="div_col displayTime">
          <span class="lbl_value">{{ dias.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}</span>
          <span class="lbl_periodo">dias</span>
          <input :id="this.id+'chk_dia'" type="checkbox" checked />
        </div>

        <div class="div_col displayTime">
          <span class="lbl_value">{{ horas.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}</span>
          <span class="lbl_periodo">horas</span>
          <input :id="this.id+'chk_h'" type="checkbox" checked />
        </div>

        <div class="div_col displayTime">
          <span class="lbl_value">{{ minutos.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}</span>
          <span class="lbl_periodo">min</span>
          <input :id="this.id+'chk_min'" type="checkbox" checked />
        </div>

        <div class="div_col displayTime">
          <span class="lbl_value">{{ segundos.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }}</span>
          <span class="lbl_periodo">seg</span>
          <input :id="this.id+'chk_seg'" type="checkbox" checked />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlusSVG from '../svg/plus.vue'
import MinusSVG from '../svg/minus.vue'
import EqualsSVG from '../svg/equals.vue'
import DiffDH from './DiffDate/DiffDateHour.vue'
import CalcDH from './DiffDate/CalcDateHour.vue'

export default {
  name: 'DiffDate',
  components: {
    PlusSVG,
    MinusSVG,
    EqualsSVG,
    DiffDH,
    CalcDH
  },
  data() {
    return {
      caixasD: [],
      caixasC: [],
      countC: 0,
      countD: 0,
      anos: '-',
      semanas: '-',
      dias: '-',
      horas: '-',
      minutos: '-',
      segundos: '-',
      total: 0,
      type: 2,

    }
  },
  methods: {
    add(id) {      
      if(this.type == 1) {
        let diffTime = document.getElementById(id+'diffTime')
        this.countD++

        diffTime?.insertAdjacentHTML(
          'beforeend',
          '<div id="'+this.id+'boxD' +
            this.countD +
            '"><div class="div_row center"><div class="div_col" style="width: 100%;"><div class="center-h"><div class="plus">+</div></div><div class="divDiff"><input id="'+this.id+'date_i' +
            this.countD +
            '" type="datetime-local" step="1" class="form-control"/>&nbsp;-&nbsp;<input id="'+this.id+'date_f' +
            this.countD +
            '" type="datetime-local" step="1" class="form-control"/></div></div></div></div>'
        )

        this.caixasD.push([document.getElementById(this.id+'date_i'+this.countD), document.getElementById(this.id+'date_f'+this.countD)])
      }
      if(this.type == 2) {
        let calcTime = document.getElementById(id+'calcTime')
        this.countC++

        calcTime?.insertAdjacentHTML(
          'beforeend',
          '<div id="'+this.id+'boxC' +
            this.countC +
            '"><div class="center-h"><div class="plus">+</div></div><div class="div_row center"><div class="divCalc"><div style="display: flex; flex-wrap: nowrap"><div class="form-text"><input id="' +
          this.id+'inpt_ano_' + this.countC + '" type="number"/></div><div class="form-text" ><input id="' +
          this.id+'inpt_sem_' + this.countC + '" type="number"/></div><div class="form-text" ><input id="' +
          this.id+'inpt_dia_' + this.countC + '" type="number"/></div></div><div style="display: flex; flex-wrap: nowrap"><div class="form-text" ><input id="' +
          this.id+'inpt_hora_' + this.countC +'" type="number"/></div><div class="form-text"><input id="' +
          this.id+'inpt_min_' + this.countC +'" type="number" /></div><div class="form-text" ><input id="' +
          this.id+'inpt_seg_' + this.countC +'" type="number"/></div></div></div></div></div>'
        )

        this.caixasC.push([document.getElementById(this.id+'inpt_ano_'+this.countC), 
                          document.getElementById(this.id+'inpt_sem_'+this.countC), 
                          document.getElementById(this.id+'inpt_dia_'+this.countC), 
                          document.getElementById(this.id+'inpt_hora_'+this.countC), 
                          document.getElementById(this.id+'inpt_min_'+this.countC), 
                          document.getElementById(this.id+'inpt_seg_'+this.countC)])
      }

      
    },
    remove(id) {
      if(this.type == 1) {
        if (this.countD > 0) {
          const element = document.getElementById(this.id+'boxD'+this.countD)
          element.remove()
          this.caixasD.pop([])
          this.countD--
        }
      }
      if(this.type == 2) {
        if (this.countC > 0) {
          const element = document.getElementById(this.id+'boxC'+this.countC)
          element.remove()
          this.caixasC.pop([])
          this.countC--
        }
      }
    },
    calc(id) {
      this.total = 0
      console.log("caixasD")
      console.log(this.caixasD)

      if(this.type == 1) {
        let time1
        let time2
        this.caixasD.forEach(element => {
          if (element[0].value != 0 && element[0].value != NaN && element[1].value != 0 && element[1].value != NaN) {
            time1 = new Date(element[0].value)
            time2 = new Date(element[1].value)
            this.total = this.total + (time2 - time1) / 1000
          }
        })
      }

      if(this.type == 2) {
        let ano, sem, dia, hora, min, seg
        this.caixasC.forEach(element => {
          console.log("a")
          console.log(element)
          let soma = 0
          if (element[0].value != NaN &&
              element[1].value != NaN &&
              element[2].value != NaN &&
              element[3].value != NaN &&
              element[4].value != NaN &&
              element[5].value != NaN) {
            ano = element[0].value
            sem = element[1].value
            dia = element[2].value
            hora = element[3].value
            min = element[4].value
            seg = element[5].value

            soma = ano * (365.25*24*60*60) +
                   sem * (7*24*60*60) +
                   dia * (24*60*60) +
                   hora * (60*60) +
                   min * 60 +
                   seg * 1

            this.total = this.total + soma
          }
        })
      }

      this.anos = "-"
      this.semanas = "-"
      this.dias = "-"
      this.horas = "-"
      this.minutos = "-"
      this.segundos = "-"
      const chk_ano = document.getElementById(id+'chk_ano')
      const chk_sem = document.getElementById(id+'chk_sem')
      const chk_dia = document.getElementById(id+'chk_dia')
      const chk_h = document.getElementById(id+'chk_h')
      const chk_min = document.getElementById(id+'chk_min')
      const chk_seg = document.getElementById(id+'chk_seg')
      if (chk_ano.checked == true) {
        this.total = this.calcYears()
      }
      if (chk_sem.checked == true) {
        if(chk_ano.checked == true) { this.anos = Math.trunc(this.anos) }
        this.total = this.calcWeeks()
      }
      if (chk_dia.checked == true) {
        if(chk_ano.checked == true) { this.anos = Math.trunc(this.anos) }
        if(chk_sem.checked == true) { this.semanas = Math.trunc(this.semanas) }
        this.total = this.calcDays()
      }
      if (chk_h.checked == true) {
        if(chk_ano.checked == true) { this.anos = Math.trunc(this.anos) }
        if(chk_sem.checked == true) { this.semanas = Math.trunc(this.semanas) }
        if(chk_dia.checked == true) { this.dias = Math.trunc(this.dias) }
        this.total = this.calcHours()
      }
      if (chk_min.checked == true) {
        if(chk_ano.checked == true) { this.anos = Math.trunc(this.anos) }
        if(chk_sem.checked == true) { this.semanas = Math.trunc(this.semanas) }
        if(chk_dia.checked == true) { this.dias = Math.trunc(this.dias) }
        if(chk_h.checked == true) { this.horas = Math.trunc(this.horas) }
        this.total = this.calcMinutes()
      }
      if (chk_seg.checked == true) {
        if(chk_ano.checked == true) { this.anos = Math.trunc(this.anos) }
        if(chk_sem.checked == true) { this.semanas = Math.trunc(this.semanas) }
        if(chk_dia.checked == true) { this.dias = Math.trunc(this.dias) }
        if(chk_h.checked == true) { this.horas = Math.trunc(this.horas) }
        if(chk_min.checked == true) { this.minutos = Math.trunc(this.minutos) }
        this.segundos = this.total
      }
    },
    calcYears() {
      this.anos = this.total / (60 * 60) / 24 / 365.25
      return this.total - (Math.trunc(this.anos) * 365 * 24 + Math.trunc(this.anos) * 6) * 60 * 60
    },
    calcWeeks() {
      this.semanas = this.total / (60 * 60) / 24 / 7
      return this.total - Math.trunc(this.semanas) * 7 * 24 * 60 * 60
    },
    calcDays() {
      this.dias = this.total / (60 * 60) / 24
      return this.total - Math.trunc(this.dias) * 24 * 60 * 60
    },
    calcHours() {
      this.horas = this.total / (60 * 60)
      return this.total - Math.trunc(this.horas) * 60 * 60
    },
    calcMinutes() {
      this.minutos = this.total / 60
      return this.total - Math.trunc(this.minutos) * 60
    },
    alternate() {
      if(this.type == 1) {
        this.type = 2
      }
      else {
        if(this.type == 2) {
          this.type = 1
        }
      }
    },
    option() {
      if(document.getElementById(this.id+'option').style.display == '' ||
      document.getElementById(this.id+'option').style.display == 'none') {
        document.getElementById(this.id+'option').style.display = 'flex'
      } else {
        document.getElementById(this.id+'option').style.display = 'none'
      }
    }
  },
  mounted() {
    this.caixasD.push([document.getElementById(this.id+'date_i0'), document.getElementById(this.id+'date_f0')]);

    this.caixasC.push([document.getElementById(this.id+'inpt_ano_0'), 
        document.getElementById(this.id+'inpt_sem_0'), 
        document.getElementById(this.id+'inpt_dia_0'), 
        document.getElementById(this.id+'inpt_hora_0'), 
        document.getElementById(this.id+'inpt_min_0'), 
        document.getElementById(this.id+'inpt_seg_0')])

    this.add(this.id)
  },
  props: {
    id: Number,
    cor: String
  },
}
</script>
<style>
.btn-plus {
  margin-right: 5px;
}
.btn-add {
  display: flex;
  flex-direction: row;
}

.form-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px;
}
.form-text > input{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 0.375rem 0.375rem;
    font-size: 1.25rem !important;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #88888850;
    border-radius: 0.25rem;
    font-weight:unset !important;
    min-width: 3.5rem !important;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 100%;
}
.form-text > input:focus {
    outline: 0;
    border-color: #6db8cc;
    box-shadow: 0 0 8px rgb(155 225 255 / 100%);
}

.option {
  border-radius: 1.25rem;
  padding: 0.5rem;
  backdrop-filter: blur(10px);
}
.option:hover {
  background-color: #fff8;
}

.select {
  cursor: pointer;
  position: absolute;
  display: inline-block !important;
  border-radius: 1.25rem;
  border: 1px solid #0003;
  backdrop-filter: blur(5px);
  box-shadow: inset 0 0 4px rgb(255 255 255 / 100%);
}

.select-content {
  font-size: 1.5rem;
  display: none;
  align-items: center;
  border-radius: 0.2rem 0.2rem 1.5rem 1.5rem;
  padding: 0.5rem;
  backdrop-filter: blur(10px);
}
.select-content:hover {
  border-radius: 1.25rem;
  background-color: #fff8;
}

.headerTime {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}
.headerTime .btn {
  display: flex;
}
#btn_total {
  display: flex;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 18px;
}
#lbl_total {
  padding-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
}
.lbl_value {
  font-size: 1.5rem;
}
.lbl_periodo {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}
.displayTime {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  align-items: center;
  padding: 0 10px;
}
.plus {
  font-family: lato;
  font-weight: 900;
  box-shadow: 0 0 2px 2px rgb(0 0 0 / 25%);
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff5;
  border: 2px solid #eee8;
  margin: -5px;
  z-index: 1;
  backdrop-filter: blur(5px);
}
.form-text > span {
  font-size: 1rem;
}

.divDiff {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 0.25rem;
  background-color: #aaa1;
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
}
.divCalc {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 0.25rem 0.2rem;
  background-color: #aaa1;
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
}

.form-control {
  width: 100%;
}

@media screen and (max-width: 585px) {
    .divDiff {
      flex-wrap: wrap;
      flex-direction: column;
    }
    .btn-add {
      display: flex;
      flex-direction: column;
    }
    .btn-plus {
      margin-right: 0;
    }
}
</style>
