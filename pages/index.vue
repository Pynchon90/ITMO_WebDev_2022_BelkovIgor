<script setup>
</script>
<template>
  <div>
    <NuxtLayout>
      Index Page
      <template #navigation>
        <NuxtLink to="/books">
          <ABtn variant="outline">
            Books
          </ABtn>
        </NuxtLink>
      </template>
    </NuxtLayout>
  </div>
</template>
