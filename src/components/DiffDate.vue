<template>
  <div>
    <div class="div_col">
      <div :id="this.id+'header'" class="headerTime">
        <div style="font-size: 1.5rem; display: flex; align-items: center" class="font-segoe">
          <img src="img\data-limite.png" style="margin-right: 0.75rem;" width="40" height="40" />
          <div class="div_col">
            <span style="font-size: 16pt; font-weight: 500;">Diferença de data e hora</span>
            <span style="font-size: 10pt;">Date and time difference</span>
          </div>
        </div>
        <div class="div_row">
          <button class="btn" style="margin: 0 5px" @click="add(this.id)">
            <PlusSVG/>
          </button>
          <button class="btn" @click="remove(this.id)">
            <MinusSVG/>
          </button>
        </div>
      </div>

      <div :id="this.id+'calcTime'" class="div_col" style="padding-bottom: 1rem;">
        <div class="div_row center">
          <div class="divDiff">
            <input :id="this.id+'date_i0'" type="datetime-local" step="1" class="form-control" />
            <div>&nbsp;-&nbsp;</div>
            <input :id="this.id+'date_f0'" type="datetime-local" step="1" class="form-control" />
          </div>
        </div>
      </div>
    </div>

    <div class="div_row">
      <div class="div_col">
        <span id="lbl_total" class="font-segoe">Total:</span>
        <button id="btn_total" class="btn" @click="calc(this.id)">Calcule</button>
      </div>
      <div class="div_row" style="width: 100%; justify-content: center">
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

export default {
  name: 'DiffDate',
  components: {
    PlusSVG,
    MinusSVG
  },
  data() {
    return {
      caixas: [],
      count: 0,
      anos: '-',
      semanas: '-',
      dias: '-',
      horas: '-',
      minutos: '-',
      segundos: '-',
      total: 0,
    }
  },
  methods: {
    add(id) {
      this.count++
      let calcTime = document.getElementById(id+'calcTime')
      calcTime?.insertAdjacentHTML(
        'beforeend',
        '<div id="'+this.id+'box' +
          this.count +
          '"><div class="div_row center"><div class="div_col"><center><div class="plus">+</div></center><div class="divDiff"><input id="'+this.id+'date_i' +
          this.count +
          '" type="datetime-local" step="1" class="form-control"/>&nbsp;-&nbsp;<input id="'+this.id+'date_f' +
          this.count +
          '" type="datetime-local" step="1" class="form-control"/></div></div></div></div>'
      )
      this.caixas.push([document.getElementById(this.id+'date_i'+this.count), document.getElementById(this.id+'date_f'+this.count)])
    },
    remove(id) {
      if (this.count > 0) {
        const element = document.getElementById(this.id+'box'+this.count)
        element.remove()
        this.caixas.pop([])
        this.count--
        console.log(this.caixas)
      }
    },
    calc(id) {
      this.total = 0
      let time1
      let time2
      console.log(this.caixas)
      this.caixas.forEach(element => {
        if (element[0].value != 0 && element[0].value != NaN && element[1].value != 0 && element[1].value != NaN) {
          time1 = new Date(element[0].value)
          time2 = new Date(element[1].value)
          this.total = this.total + (time2 - time1) / 1000
        }
      })
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
    alt() {},
  },
  mounted() {
    this.caixas.push([document.getElementById(this.id+'date_i0'), document.getElementById(this.id+'date_f0')]);
  },
  props: {
    id: Number,
  },
}
</script>
<style>
.headerTime {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
}
.headerTime .btn {
  display: flex;
}
#btn_total {
  padding: 0rem 0.75rem;
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
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
}
.divDiff {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 0.25rem;
  background-color: #a551;
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 585px) {
    .divDiff {
        flex-wrap: wrap;
        flex-direction: column;
    }
}
</style>