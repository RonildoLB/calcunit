<template>
  <div id="content">
    <div style="margin: auto">
      <div style="flex-wrap: wrap" class="row">
        <SelectComponent type="1"/>
      </div>
    </div>
  </div>
</template>

<script>
import SelectComponent from './components/SelectComponent.vue'

export default {
  components: { SelectComponent },
  data() {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style>
#content {
  display: flex;
  width: 100%;
}
</style>

