<script setup>
const user = useUser();
</script>
<template>
  <div>
    Books Page: {{ user.name }}
    <Teleport to="#header-navigation">
      <NuxtLink to="/">Home</NuxtLink>
    </Teleport>
  </div>
</template>