<template>
  <h1 ref="header">App Counter</h1>
  <input v-model="inputText" />
  <button @click="onButtonClick" :disabled="isAllowedToSave">Add</button>
  <h2 v-for="(todo, index) in list" :key="index">
    {{ todo }}
    <button @click="onDelete(index)">x</button>
  </h2>
  <CounterValue
      v-if="isShown"
      class="counter"
      v-for="obj in [{ index: 1, text: 'Clicked' }]"
      :title="obj.text"
      :value="counter"
      :key="obj.index"
  />
  <button v-on:click="onPlus">+</button>
  <button v-if="canRenderMinusButton" @click="onMinus">-</button>
</template>
<script>
import CounterValue from './components/CounterValue.vue';

const LOCAL_KEY_COUNTER = 'counter';
const LOCAL_KEY_TEXT = 'text';
const LOCAL_KEY_LIST = 'list';

const save = (key, value) => localStorage.setItem(key, value);

let counterWatcher = null;

export default {
  components: {
    CounterValue,
  },
  data() {
    return {
      counter: 0,
      inputText: '',
      list: [],
    };
  },
  created() {
    console.log('> created: ', this.counter);
    this.list = JSON.parse(localStorage.getItem(LOCAL_KEY_LIST)) || [];
    this.inputText = localStorage.getItem(LOCAL_KEY_TEXT) || '';
    this.counter = localStorage.getItem(LOCAL_KEY_COUNTER) || 0;
    counterWatcher = this.$watch(
        () => this.counter,
        (newValue, oldValue) => {
          console.log('> counter watched:', { newValue, oldValue });
          save(LOCAL_KEY_COUNTER, newValue);
        },
    );
    this.$watch(
        () => this.inputText,
        (value) => {
          save(LOCAL_KEY_TEXT, value);
        },
    );
    this.$watch(
        () => this.list.length,
        (value) => {
          console.log('> watch: list =', value);
          save(LOCAL_KEY_LIST, JSON.stringify(this.list));
        },
    );
  },
  mounted() {
    console.log('> mounted: ', this.counter);
  },
  computed: {
    isShown() {
      return this.counter < 15;
    },
    canRenderMinusButton() {
      return this.counter > 0;
    },
    isAllowedToSave() {
      return this.inputText.length === 0;
    },
  },
  methods: {
    onDelete(index) {
      this.list.splice(index, 1);
    },
    onButtonClick() {
      this.list.push(this.inputText);
      this.inputText = '';
    },
    onPlus() {
      this.counter++;
      console.log('> Counter -> onPlus:', this.counter, this);
    },
    onMinus() {
      this.counter--;
      if (this.counter === 0) {
        this.$refs.header.innerText = `Header: ${this.counter}`;
      }
      console.log('> Counter -> onMinus:', this.counter);
    },
  },
  unmounted() {
    counterWatcher();
  },
};
</script>
<style lang="scss" scoped>
.counter {
  color: green;
}
</style>
