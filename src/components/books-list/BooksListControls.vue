<script setup lang="ts">
defineProps<{ isLoading: boolean; pageIndex: number; maxPages: number }>();
defineEmits(['prev', 'next']);
</script>

<template>
  <div style="margin: 2rem 0">
    <button v-if="pageIndex > 0" :disabled="isLoading" @click="$emit('prev')" style="margin-right: 1rem">Prev</button>
    <button v-if="pageIndex < maxPages" :disabled="isLoading" @click="$emit('next')">Next</button>
  </div>
</template>
<style scoped></style>
