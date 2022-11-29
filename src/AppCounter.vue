<template>
  <h1> App Counter</h1>
<!--  <p
      v-for="obj in [
      { index: 1, text: 'Clicked' }
      ]" class="counter-value" :key="obj.index">
    <span style="color: blue">
      {{obj.text}}
    </span>
    :{{ counter }}
  </p>-->
  <CounterValue   v-for="obj in [{ index: 1, text: 'Clicked' }]"
                  :title="obj.text"
                  :value="counter"
                  :key="obj.index" />
<!--  <p v-html="innerHTML"></p>-->
  <button v-on:click="onPlus">+</button>
  <button v-if="canRenderMinusButton" @click="onMinus">-</button>
</template>

<script>
import CounterValue from "./components/CounterValue.vue";
export default {
  components: {CounterValue},
  data() {
    return {
      counter: 0,
      innerHTML: `<h2>Hello World </h2>`
    }
  },
  computed:{
    canRenderMinusButton() {
      return this.counter > 0;
    }
  },
  methods:{
    onPlus(){
      this.counter++;
      console.log('> Counter -> onPlus:', this.counter);
    },
    onMinus(){
      this.counter--;
      console.log('> Counter -> onMinus:', this.counter);
    }
  }
}
</script>

<style scoped>
p.counter-value {
  color: red;
  font-size: 2rem;
  font-weight: normal;
}
</style>