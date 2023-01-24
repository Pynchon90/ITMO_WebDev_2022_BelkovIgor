<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import UploadBooks from '../components/UploadBooks.vue';
import BooksListHeader from '../components/books-list/BooksListHeader.vue';
import BooksListControls from '../components/books-list/BooksListControls.vue';

import gql from 'graphql-tag';

const LIMIT = 10;
const currentPageIndex = ref(0);
const {
  result,
  loading: isBooksLoading,
  load,
  fetchMore,
} = useLazyQuery(
  gql`
    query GetBooks($limit: Int, $offset: Int) {
      books(limit: $limit, offset: $offset) {
        title
      }
      books_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  `,
  { limit: LIMIT, offset: currentPageIndex.value },
);

const booksList = computed(() => result.value?.books || []);
const maxBooks = computed(() => result.value?.books_aggregate.aggregate.count || 0);
const maxPages = computed(() => Math.ceil(maxBooks.value / LIMIT));
const pageIndex = computed(() => currentPageIndex.value + 1);

const canRenderUpload = computed(() => {
  const result = !isBooksLoading.value && maxBooks.value == 0;
  console.log('> canRenderUpload:', result);
  return result;
});
const canRenderLoading = computed(() => isBooksLoading.value && maxBooks.value == 0);

const getBookIndex = (index: number) => 1 + index + currentPageIndex.value * LIMIT;
const loadMoreBooks = () =>
  fetchMore({
    variables: { offset: currentPageIndex.value * LIMIT },
    updateQuery: (previousQueryResult, { fetchMoreResult }) => {
      console.log('> BooksPage -> loadMoreBooks -> updateQuery', fetchMoreResult);
      if (!fetchMoreResult) return previousQueryResult;
      return fetchMoreResult;
    },
  });

const onPageNextClick = () => {
  currentPageIndex.value++;
  loadMoreBooks();
};

const onPagePrevClick = () => {
  currentPageIndex.value--;
  loadMoreBooks();
};

const onUploadComplete = () => {
  console.log('> BooksPage -> onUploadComplete:');
  fetchMore({});
};

onMounted(() => {
  console.log('> BooksPage -> onMounted');
  load();
});
onUnmounted(() => {
  // pb.collection('books').unsubscribe();
});
</script>

<template>
  <UploadBooks v-if="canRenderUpload" @upload-complete="onUploadComplete" />
  <div v-else-if="canRenderLoading">Loading...</div>
  <div v-else>
    <BooksListHeader :max-books="maxBooks" :page-index="pageIndex" />
    <BooksListControls
      :is-loading="isBooksLoading"
      :max-pages="maxPages"
      :page-index="currentPageIndex"
      @next="onPageNextClick"
      @prev="onPagePrevClick"
      style="margin: 2rem 0"
    />
    <div v-if="!isBooksLoading" style="text-align: left; width: 400px">
      <div v-for="(book, index) in booksList" :key="book.id">{{ getBookIndex(index) }}. {{ book.title }}</div>
    </div>
    <div v-else>Page loading</div>
  </div>
</template>

<style scoped></style>
