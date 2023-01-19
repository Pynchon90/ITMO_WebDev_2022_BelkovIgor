<script setup lang="ts">
import { computed } from 'vue';
import Routes from '../consts/Routes';
import { useRouter } from 'vue-router';

const props: any = defineProps<{ userData?: any }>();
const router = useRouter();

const isUserAuthenticated = computed(() => !!props.userData);
const isCurrentPageNotLogin = computed(() => {
  const currentRoute = router.currentRoute.value;
  return currentRoute.path !== Routes.LOGIN;
});

const isCurrentPageNotBooks = computed(() => {
  const currentRoute = router.currentRoute.value;
  return currentRoute.path !== Routes.BOOKS;
});
</script>
<template>
  <header style="width: 100%; padding: 1rem; background-color: lightgrey">
    <h2>Header</h2>
    <div v-if="isUserAuthenticated">
      {{ userData.username }}
      <div v-if="isCurrentPageNotBooks">
        <RouterLink :to="Routes.BOOKS">Books</RouterLink>
      </div>
      <div v-else>
        <RouterLink :to="Routes.INDEX">Home</RouterLink>
      </div>
    </div>
    <div v-else-if="isCurrentPageNotLogin">
      <RouterLink :to="Routes.LOGIN">Login</RouterLink>
    </div>
    <div v-else>You don't have access</div>
  </header>
</template>
<style scoped></style>
