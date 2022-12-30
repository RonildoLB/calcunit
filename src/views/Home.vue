<template>
  <div id="content">
    <div style="margin: auto">
      <div style="flex-wrap: wrap" class="row">
        <div style="margin: auto">
          <div class="component">
            <div class="interno">
              <AddHour :id="1"/>
            </div>
          </div>
        </div>

        <div style="margin: auto">
          <div class="component">
            <div class="interno">
              <AddHour :id="2"/>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  .component {
    background-image: linear-gradient(to bottom right, #fff3ab 60%, #fff7d2);
    padding: 1rem;
    margin: 1rem;
    box-shadow: 0px 4px 4px 1px #00000025;
  }
  .interno {
    padding: 1rem;
    border: dashed 1px #8888;
  }
</style>
