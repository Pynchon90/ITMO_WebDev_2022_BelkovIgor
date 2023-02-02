<script setup lang="ts">
const user = useUser();
const books = useBooks();
const { data: userData, pending: isUserLoading } = user.getUser();
const { pending: isBooksLoading } = books.getAll();
const { data: users } = useFetch('/api/users');
console.log('App -> Loading:', { users: users.value, isUserLoading });
</script>
<template>
  <div v-if="isBooksLoading && isUserLoading">Loading...</div>
  <div v-else>
    <div>User {{ userData.name }}</div>
    <NuxtPage :transition="{
      name: 'slide-left',
      mode: 'out-in'
    }" />
  </div>
</template>