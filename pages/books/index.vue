<script setup lang="ts">
import { books } from "@prisma/client";

interface IPageData {
  data: Array<books>
}

const user = useUser().getUser();
const { data: books }: IPageData = useBooks().getAll();
</script>
<template>
  <div>
    Books Page: {{ user.name }}
    <div>
      <Welcome />
      <NuxtLink to="/">Home</NuxtLink>
    </div>
    <div v-for="book in books">
      {{ book.title }}
    </div>
  </div>
</template>