<script setup lang="ts">
import { ref } from 'vue'
import { computed } from "vue";
import Routes from '../consts/Routes';
const props = defineProps<{ userData: any }>();
const isUserAuthenticated = computed(()=> !!props.userData);
</script>

<template>
  <header>
 <div>Header</div>
  <div v-if="isUserAuthenticated">{{ userData.username}}</div>
  <div v-else>
    <RouterLink :to="Routes.LOGIN">Login</RouterLink>
  </div>
  </header>
</template>
<script lang="ts">
export default {
  computed: {},
  methods: {},
};
</script>

<style scoped>
</style>
