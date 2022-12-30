<template>
    <div>
        {{id}}
        <div class="col">
            <div id="headerTime">
                <div style="font-size: 1.5rem;" class="fontSegoe">
                    Cálculo de diferença de horários
                </div>
                <div class="row">
                    <button class="btn" style="margin: 0 5px" @click="add()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                            <path fill-rule="evenodd" d="M8,6 L8,3 C8,2.44771525 7.55228475,2 7,2 C6.44771525,2 6,2.44771525 6,3 L6,6 L3,6 C2.44771525,6 2,6.44771525 2,7 C2,7.55228475 2.44771525,8 3,8 L6,8 L6,11 C6,11.5522847 6.44771525,12 7,12 C7.55228475,12 8,11.5522847 8,11 L8,8 L11,8 C11.5522847,8 12,7.55228475 12,7 C12,6.44771525 11.5522847,6 11,6 L8,6 Z"/>
                        </svg>
                    </button>
                    <button class="btn" @click="remove()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                            <path fill-rule="evenodd" d="M12,7 C12,7.55228475 11.5522847,8 11,8 L3,8 C2.44771525,8 2,7.55228475 2,7 C2,6.44771525 2.44771525,6 3,6 L11,6 C11.5522847,6 12,6.44771525 12,7 Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div id="calcTime">
                <div class="divDiff">
                    
                    <input id="date_i0" type="datetime-local" step="1" class="form-control"/>
                    &nbsp;-&nbsp;
                    <input id="date_f0" type="datetime-local" step="1" class="form-control"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <span id="lbl_total" class="fontSegoe">Total:</span>
                <button id="btn_total" class="btn" @click="calc()">Calcular</button>
            </div>
            <div class="row" style="width: 100%; justify-content: center">
                <div class="col displayTime">
                    <span class="lbl_value">{{ anos.toLocaleString("pt-BR", { maximumFractionDigits: 1}) }}</span>
                    <span class="lbl_periodo">anos</span>
                    <input id="chk_ano" type="checkbox" checked/>
                </div>

                <div class="col displayTime">
                    <span class="lbl_value">{{ semanas.toLocaleString("pt-BR", { maximumFractionDigits: 1}) }}</span>
                    <span class="lbl_periodo">sem</span>
                    <input id="chk_mes" type="checkbox" checked/>
                </div>

                <div class="col displayTime">
                    <span class="lbl_value">{{ dias.toLocaleString("pt-BR", { maximumFractionDigits: 1}) }}</span>
                    <span class="lbl_periodo">dias</span>
                    <input id="chk_dia" type="checkbox" checked/>
                </div>

                <div class="col displayTime">
                    <span class="lbl_value">{{ horas.toLocaleString("pt-BR", { maximumFractionDigits: 1}) }}</span>
                    <span class="lbl_periodo">horas</span>
                    <input id="chk_h" type="checkbox" checked/>
                </div>

                <div class="col displayTime">
                    <span class="lbl_value">{{ minutos.toLocaleString("pt-BR", { maximumFractionDigits: 1}) }}</span>
                    <span class="lbl_periodo">min</span>
                    <input id="chk_min" type="checkbox" checked/>
                </div>

                <div class="col displayTime">
                    <span class="lbl_value">{{ segundos.toLocaleString("pt-BR", { maximumFractionDigits: 1}) }}</span>
                    <span class="lbl_periodo">seg</span>
                    <input id="chk_seg" type="checkbox" checked/>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    name: "AddHour",
    components: {
        
    },
    data(){
      return{
        caixas: [],
        count: 0,
        anos: "-",
        semanas: "-",
        dias: "-",
        horas: "-",
        minutos: "-",
        segundos: "-",
        total: 0
      }
    },
    methods: {
        add() {
            this.count++
            let calcTime = document.getElementById('calcTime')

            calcTime?.insertAdjacentHTML('beforeend', '<div id="box'+this.count+'"><center><div class="plus">+</div></center><div class="divDiff"><input id="date_i'+this.count+'" type="datetime-local" step="1" class="form-control"/>&nbsp;-&nbsp;<input id="date_f'+this.count+'" type="datetime-local" step="1" class="form-control"/></div></div>');

            this.caixas.push([document.getElementById('date_i'+this.count),
                              document.getElementById('date_f'+this.count)])

            console.log(this.caixas)
        },
        remove() {
            if(this.count > 0) {
                const element = document.getElementById('box'+this.count);
                element.remove();

                this.caixas.pop([]);
                this.count--;
                console.log(this.caixas)
            }
        },

        calc() {
            this.total = 0
            let time1
            let time2
            this.caixas.forEach(element => {
                if(element[0].value != 0 && element[0].value != NaN &&
                   element[1].value != 0 && element[1].value != NaN) {
                    time1 = new Date(element[0].value)
                    time2 = new Date(element[1].value)
                    this.total = this.total + ((time2 - time1) / 1000)
                }
            });

            this.anos = 0; this.semanas = 0; this.dias = 0;
            this.horas = 0; this.minutos = 0; this.segundos = 0;
            
            if(document.getElementById('chk_ano').checked == true) {
                this.total = this.calcYears();
            }
            if(document.getElementById('chk_mes').checked == true) {
                this.anos = Math.trunc(this.anos);
                this.total = this.calcWeeks();
            }
            if(document.getElementById('chk_dia').checked == true) {
                this.anos = Math.trunc(this.anos)
                this.semanas = Math.trunc(this.semanas)
                this.total = this.calcDays();
            }
            if(document.getElementById('chk_h').checked == true) {
                this.anos = Math.trunc(this.anos)
                this.semanas = Math.trunc(this.semanas)
                this.dias = Math.trunc(this.dias)
                this.total = this.calcHours();
            }
            if(document.getElementById('chk_min').checked == true) {
                this.anos = Math.trunc(this.anos)
                this.semanas = Math.trunc(this.semanas)
                this.dias = Math.trunc(this.dias)
                this.horas = Math.trunc(this.horas)
                this.total = this.calcMinutes();
            }
            if(document.getElementById('chk_seg').checked == true) {
                this.anos = Math.trunc(this.anos)
                this.semanas = Math.trunc(this.semanas)
                this.dias = Math.trunc(this.dias)
                this.horas = Math.trunc(this.horas)
                this.minutos = Math.trunc(this.minutos)
                this.segundos = this.total;
            }
        },

        calcYears() {
            this.anos = ((this.total / (60*60)) / 24) / 365.25
            return this.total - ((((Math.trunc(this.anos) * 365) * 24) + Math.trunc(this.anos) * 6) * 60 * 60)
        },
        calcWeeks() {
            this.semanas = ((this.total / (60*60)) / 24) / 7
            return this.total - (Math.trunc(this.semanas) * 7 * 24 * 60 * 60)
        },
        calcDays() {
            this.dias = ((this.total / (60*60)) / 24)
            return this.total - (Math.trunc(this.dias) * 24 * 60 * 60)
        },
        calcHours() {
            this.horas = (this.total / (60*60))
            return this.total - (Math.trunc(this.horas) * 60 * 60)
        },
        calcMinutes() {
            this.minutos = this.total / 60
            return this.total - (Math.trunc(this.minutos) * 60)
        },

        alt() {

        }
    },
    mounted () {
        this.caixas.push([document.getElementById('date_i0'),
                          document.getElementById('date_f0')])
    },
    props: {
        id: Number
    }
}
</script>

<style>
    svg {
        padding: 10px;
        fill: #fff;
    }
    #headerTime {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 0.75rem;
    }
    #headerTime .btn {
        display: flex;
    }
    #calcTime {
        padding: 0 0 1rem 0;
    }
    #btn_total {
        padding: 0rem 0.75rem;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    .fontSegoe {
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .btn {
        min-width: 2.5rem;
        min-height: 2.5rem;
        border: 1px solid #ffffffaa;
        color: #ffffff;
        background-image: linear-gradient(#3E95E5, #146ABA);
        border-radius: 5px;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight: bold;
        font-size: 1.25rem;
        cursor: pointer;
    }
    .btn:hover {
        background-image: linear-gradient(#4b95da, #125da3);
        border: 1px solid #ffffffcc;
    }
    .btn:active {
        background-image: linear-gradient(#053663, #146ABA);
        border: 1px solid #ffffffcc;
        color: #d7e6f3;
    }
    .plus {
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight: bold;
    }
    .form-control{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .form-control:focus{
        outline: 0;
        border-color: #6db8cc !important;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(155 225 255 / 60%) !important;
    }
    .divDiff {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        padding: 0.25rem;
        border-radius: 0.5rem;
        border: 1px solid #ced4da;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
    }
</style>
