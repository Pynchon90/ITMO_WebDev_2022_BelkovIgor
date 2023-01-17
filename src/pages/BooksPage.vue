<script setup lang="ts">
import { inject, ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import UploadBooks from '../components/UploadBooks.vue';
import gql from 'graphql-tag';

const LIMIT = 10;

const { result, load, fetchMore } = useLazyQuery(gql`
  query GetBooks {
    books {
      title
    }
  }
`);

// const pb: any = inject('pb');

const booksList = ref<any>([]);
const currentPageIndex = ref(0);
const maxBooks = ref(0);
const isLoading = ref(true);

const canRenderUpload = computed(() => {
  const result = !isLoading.value && maxBooks.value == 0;
  console.log('> canRenderUpload:', result);
  return result;
});
const canRenderNextPageButton = computed(
  () => currentPageIndex.value < Math.floor((maxBooks.value - 1) / LIMIT),
);
const loadBooks = async () =>
  Promise.resolve()
    .then(() => (isLoading.value = true))
    .then(() => pb.collection('books').getList(1, LIMIT, {}))
    .then((result) => {
      booksList.value = result.items;
      isLoading.value = false;
      maxBooks.value = result.totalItems;
      console.log(canRenderUpload.value, maxBooks.value, result);
    });

const getBookIndex = (index: number) =>
  1 + index + currentPageIndex.value * LIMIT;

const onPageNextClick = () => {
  currentPageIndex.value++;
  loadBooks();
};

const onPagePrevClick = () => {
  currentPageIndex.value--;
  loadBooks();
};

// pb.collection('books').subscribe('*', (change: any) => {
//   console.log('> change', change);
//   loadBooks();
// });

const onUploadComplete = () => {
  console.log('> BooksPage -> onUploadComplete:');
  fetchMore({
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return;
      isLoading.value = false;
      maxBooks.value = fetchMoreResult.books.length;
      booksList.value = fetchMoreResult.books;
    },
  });
};

onMounted(() => {
  console.log('> BooksPage -> onMounted');
  load();
  const unwatch = watch(result, (value) => {
    unwatch();
    isLoading.value = false;
    maxBooks.value = value.books.length;
    booksList.value = value.books;
    console.log(value);
  });
});
onUnmounted(() => {
  // pb.collection('books').unsubscribe();
});
</script>

<template>
  <UploadBooks v-if="canRenderUpload" @upload-complete="onUploadComplete" />
  <div v-else-if="isLoading">Loading...</div>
  <div v-else>
    <h2>
      Books, page <span>{{ currentPageIndex + 1 }}</span>
    </h2>
    <div style="margin: 2rem 0">
      <button
        v-if="currentPageIndex > 0"
        @click="onPagePrevClick"
        style="margin-right: 1rem"
      >
        Prev
      </button>
      <button v-if="canRenderNextPageButton" @click="onPageNextClick">
        Next
      </button>
    </div>
    <div style="text-align: left; width: 400px">
      <div v-for="(book, index) in booksList">
        {{ getBookIndex(index) }}. {{ book.title }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
