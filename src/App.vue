<script setup lang="ts">
// import MainHeader from './components/MainHeader.vue';
// import { inject, ref } from 'vue';

// const pb: any = inject('pb');
// const userData = ref(pb.authStore.model);
// pb.authStore.onChange(() => {
//   userData.value = pb.authStore.model;
// });
</script>

<template>
  <!-- <MainHeader :userData="userData"></MainHeader> -->
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <Component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped></style>
