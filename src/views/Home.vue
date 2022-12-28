<template>
  <div id="content">
      <AddHour/>
  </div>
</template>

<script>
import AddHour from '../components/AddHour.vue'

export default {
  components: { AddHour },
    data(){
      return{
      }
    }
}
</script>

<style>
  #content {
    display: flex;
    width: 100%;
  }
</style>
