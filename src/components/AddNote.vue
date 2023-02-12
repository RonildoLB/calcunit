<template>
  <div class="div_col" style="position: relative" >
    <div :id="this.id+'lbl_copy'" class="lbl_copy font-segoe" hidden="true">
     Copiado!
    </div>
    <div class="header">
        <div style="font-size: 1.5rem; display: flex; align-items: center" class="font-segoe">
          <img src="img\bloco-de-notas.png" style="margin-right: 0.75rem;" width="40" height="40" draggable="false"/>
          <div class="div_col">
            <span style="font-size: 16pt; font-weight: 500;">Notas</span>
            <span style="font-size: 10pt;">Notes</span>
          </div>
         
        </div>
        <div>
          <button :disabled="textarea == ''" title="Copiar" @click="copy(this.id)" class="btn btn-blue" style="min-width: unset !important; min-height: unset !important;">
            <CopySVG/>
          </button>
        </div>
    </div>
    <textarea v-model="textarea" :id="this.id+'textarea'" class="form-control" rows="9" cols="25"></textarea>
  </div>
</template>

<script>
import CopySVG from '../svg/copy.vue'

export default {
  name: 'AddHour',
  components: {
    CopySVG
  },
  data() {
    return {
      timer: 0,
      textarea: "",
    }
  },
  methods: {
    copy(id) {
      let textArea = document.getElementById(id+'textarea');
      textArea.select();
      document.execCommand('copy');
      document.getSelection().collapseToEnd();
      let lbl_copy = document.getElementById(id+'lbl_copy')
      lbl_copy.classList.remove('lbl_copy_transparent');
      lbl_copy.classList.add('lbl_copy');
      lbl_copy.hidden = false
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        lbl_copy.classList.toggle('lbl_copy_transparent');
        this.timer = setTimeout(() => {lbl_copy.hidden = true;}, 500);
      }, 1000);
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
textarea {
  background-color: #fff5 !important;
  color: #000 !important;
  min-width: 10rem;
  min-height: 2.5em;
  box-shadow: inset 0 0 5px 1px #0001;
  font-size: 14.5pt !important;
}
.lbl_copy {
  padding: 0.4rem 1rem 0.5rem 1rem;
  border-radius: 50px;
  color: aliceblue;
  font-weight: bold;
  background-color: #303030;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s;
  opacity: 1;
  box-shadow: 3 5 10px rgb(10 10 10 / 25%);
}
.lbl_copy_transparent {
  opacity: 0;
}
</style>