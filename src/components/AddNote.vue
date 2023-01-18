<template>
  <div class="div_col" style="position: relative" >
    <div :id="this.id+'lbl_copy'" class="lbl_copy font-segoe" hidden="true">
     Copiado!
    </div>
    <div class="header">
        <div style="font-size: 1.5rem; display: flex;" class="font-segoe">
          <NoteSVG style="margin-right: 0.75rem;"/>
          <span style="font-weight: 500">Notas</span>
        </div>
        <div>
          <button :disabled="textarea == ''" title="Copiar" @click="copy(this.id)" class="btn" style="min-width: unset !important; min-height: unset !important;">
            <svg xmlns="http://www.w3.org/2000/svg" style="padding: 6px !important" width="24pt" height="24pt" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          </button>
        </div>
    </div>
    <textarea v-model="textarea" :id="this.id+'textarea'" class="form-control" rows="10" cols="30"></textarea>
  </div>
</template>

<script>
import NoteSVG from '../svg/notes.vue'

export default {
  name: 'AddHour',
  components: {
    NoteSVG
  },
  data() {
    return {
      timer: 0,
      textarea: ""
    }
  },
  methods: {
    copy(id) {
      let textArea = document.getElementById(id+'textarea');
      textArea.select();
      document.execCommand('copy');
      document.getSelection().collapseToEnd();
      let lbl_copy = document.getElementById(id+'lbl_copy')
      lbl_copy.hidden = false
      clearTimeout(this.timer)
      this.timer = setTimeout(() => lbl_copy.hidden = true, 1500);
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
}
</style>