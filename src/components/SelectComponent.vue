<template>
  <div style="margin: auto">
    <div class="component" :class="active">
      <div class="interno">
        <AddHour v-if="type=='1'"/>
      </div>
    </div>
  </div>
</template>

<script>
import AddHour from './AddHour.vue'

export default {
  name: 'SelectComponent',
  components: { AddHour },
  data() {
    return {
      active: "yellow"
    }
  },
  methods: {
    changeColor(color) {
      switch (color) {
        case 1:
          this.active = "yellow";
          break;
        case 2:
          this.active = "green";
          break;
        case 3:
          this.active = "pink";
          break;
        case 4:
          this.active = "purple";
          break;
        case 5:
          this.active = "blue";
          break;
        case 6:
          this.active = "gray";
          break;
      }
    }
  },
  mounted() {

  },
  props: {
    type: String
  },
}
</script>
<style>
.component {
  background-image: linear-gradient(
    178deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 73%,
    rgba(255, 255, 255, 0.35) 79%
  );
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0px 4px 4px 1px #00000025;
}
.interno {
  padding: 1rem;
  border: dashed 1px #aaaa;
}
.yellow {
  background-color: #fff2ab;
}
.green {
  background-color: #cbf1c4;
}
.pink {
  background-color: #ffcce5;
}
.purple {
  background-color: #e7cfff;
}
.blue {
  background-color: #cde9ff;
}
.gray {
  background-color: #e1dfdd;
}
</style>
