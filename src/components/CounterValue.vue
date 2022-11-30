<template>
  <p class="counter-value">
     <span style="color: blue"> {{title}} </span> :{{ value }}
  </p>
</template>

<script>
export default {
  props:{
    title: '',
    value: 0,
  },
  computed:{
    isCounterAlert() {
      return this.value >= 10;
    },
  },
};
</script>

<style scoped>
p.counter-value {
  color: red;
  font-size: 2rem;
  font-weight: normal;
&.alert {
                         background-color: lightcoral;
                       }
};

</style>