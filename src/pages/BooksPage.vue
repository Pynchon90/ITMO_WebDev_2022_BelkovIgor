<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useLazyQuery, useMutation } from '@vue/apollo-composable';
import UploadBooks from '../components/UploadBooks.vue';
import BooksListHeader from '../components/books-list/BooksListHeader.vue';
import BooksListControls from '../components/books-list/BooksListControls.vue';
import userModel from '../model/UserModel';

import gql from 'graphql-tag';
import { useRouter, useRoute } from 'vue-router';

const LIMIT = 10;
const router = useRouter();
const currentPageIndex = ref<number>(parseInt((useRoute().query.page || '').toString()) - 1 || 0);
const offset = computed(() => currentPageIndex.value * LIMIT);
const {
  result,
  loading: isBooksLoading,
  load,
} = useLazyQuery(
  gql`
    query GetBooks($limit: Int, $offset: Int, $user_id: uuid = null) {
      books(limit: $limit, offset: $offset) {
        id
        title
        book_users(where: {user_id: {_eq: $user_id}}) {
          id
        }
        book_users_aggregate(where: {user_id: {_eq: $user_id}}) {
          aggregate {
            count(columns: book_id)
          }
        }
      }
      books_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  `,
  { limit: LIMIT, offset: offset, user_id: userModel?.userData?.id || null },
  {
    fetchPolicy: 'network-only',
  }
);

const {
  mutate: deleteBookById,
} = useMutation(gql`
  mutation DeleteUserBookById($id: Int = 10) {
    delete_user_books_by_pk(id: $id) {
      id
    }
  }
`);

const {
  mutate: insertUserBook,
} = useMutation(gql`
  mutation InsertUserBook($book_id: Int!, $user_id: uuid!) {
  insert_user_books_one(object: {book_id: $book_id, user_id: $user_id}) {
    id
  }
}
`);

const booksList = computed(() => result.value?.books.map((data: any) => {
  const book = {
    id: data.id,
    title: data.title,
    userOwned: reactive(data.book_users.map((ub: any) => ({ id: ub.id }))),
    loading: false
  }
  return (reactive(book)); 
}) || []);

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

const onPageNextClick = () => {
  console.log('> BooksPage -> onPageNextClick:');
  currentPageIndex.value++;
};

const onPagePrevClick = () => {
  console.log('> BooksPage -> onPagePrevClick:');
  currentPageIndex.value--;
};

const onUploadComplete = () => {
  console.log('> BooksPage -> onUploadComplete:');
  currentPageIndex.value = 0;
};

const onAddBookToUserClick = (book: any) => {
  console.log('> BooksPage -> onAddBookToUserClick', result.value?.books);
  book.loading = true;
  insertUserBook({ book_id: book.id, user_id: userModel!.userData!.id })
    .then((data: any) => {
      console.log('Inserted', data );
      book.userOwned.push({ id: data.id });
      book.loading = false;
    });
}

const onRemoveBookFromUserClick = (book: any) => {
  console.log('> BooksPage -> onRemoveBookFromUserClick', book);
  if (book.userOwned.length > 0) {
    book.loading = true;
    deleteBookById({ id: book.userOwned.shift().id }).then(() => {
      console.log('Removed:', book.userOwned[0]);
      book.loading = false;
    })
  }
}

onMounted(() => {
  console.log('> BooksPage -> onMounted');
  watch(currentPageIndex, (value) => {
    console.log('> BooksPage -> currentPageIndex:', value);
    router.push({ query: { page: pageIndex.value, },})
  })
  load();
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
    <div v-if="!isBooksLoading" style="text-align: left; width: 100%">
      <div v-for="(book, index) in booksList" :key="book.id" style="padding: 0.2rem 0">
        <span style="font-size: 0.75rem; font-weight: bold;">
          <button 
            :disabled="book.loading"
            style="margin-right: 0.2rem; width: 1rem;" 
            @click="onAddBookToUserClick(book)"
          >
            +
          </button>
          <button
            style="width: 1rem;"
            :disabled="book.loading || !book.userOwned.length" 
            @click="onRemoveBookFromUserClick(book)"
          >
            -
          </button>
        </span>
        {{ getBookIndex(index) }}. {{ book.title }} ({{ book.userOwned.length }})
      </div>
    </div>
    <div v-else>Page loading</div>
  </div>
</template>

<style scoped></style>
