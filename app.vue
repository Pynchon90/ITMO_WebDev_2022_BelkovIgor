<script setup lang="ts">
const setting = useRuntimeConfig();
const user = useState('user')
if (user.value == null) useFetch(`${setting.DATA_API}/users/1`)
  .then((response) => {
    user.value = response.data;
  });
const { data: comments } = useFetch(`${setting.DATA_API}/comments`)
console.log('App -> Loading:', setting.DATA_API);
</script>
<template>
  <div v-if="!(user && comments)">Loading...</div>
  <NuxtLayout v-else>
    <div>User {{ user.name }}</div>
    <NuxtPage :transition="{
        name: 'slide-left',
        mode: 'out-in'
      }" />
  </NuxtLayout>
</template>