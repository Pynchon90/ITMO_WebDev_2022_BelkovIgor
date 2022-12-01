<template>
  <p class="value" :class="{alert: isCounterAlert }">
     <span style="color: blue"> {{title}} </span> :{{ value }}
  </p>
</template>

<script>
export default {
  props:{
    title: '',
    value: 0,
    showAlert: false,
  },
  computed:{
    isCounterAlert() {
      return this.value >= 10;
    },
  },
};
</script>

<style lang="scss" scoped>
.value {
  color: red;
  font-size: 2rem;
  font-weight: normal;

&.alert {
  background-color: lightcoral;
}
};

</style>