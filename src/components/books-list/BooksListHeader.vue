<script setup lang="ts">
defineProps<{ maxBooks: number; pageIndex: number }>();
</script>

<template>
  <h2>
    Books ({{ maxBooks }}), page <span>{{ pageIndex }}</span>
  </h2>
</template>
<style scoped></style>
