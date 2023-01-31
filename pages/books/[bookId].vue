<script setup>
const route = useRoute();
const bookId = route.params.bookId;
const year = route.query.year;
</script>
<template>
  <div>
    Books {{ year && `(from: ${year})` }}
    <div>Id: {{ bookId }}</div>
    <Teleport to="#header-navigation">
      <NuxtLink to="/books">Back</NuxtLink>
    </Teleport>
  </div>
</template>