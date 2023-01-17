<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const emit = defineEmits(['upload-complete']);

const {
  mutate: insertBooks,
  onDone,
  loading,
} = useMutation(gql`
  mutation InsertBooks($books: [books_insert_input!] = []) {
    insert_books(objects: $books) {
      returning {
        id
      }
    }
  }
`);

onDone((result) => {
  console.log('> UploadBooks -> onDone:', result.data);
  emit('upload-complete');
});

const domInputFile = ref(null);
const onUploadClick = () => {
  console.log('> onUploadClick');
  const input = domInputFile.value! as HTMLInputElement;
  input.onchange = () => {
    const fileList = input.files as FileList;
    const selectedFile = fileList[0];
    console.log('selectedFile:', selectedFile);
    const reader = new FileReader();
    input.disabled = true;
    reader.onload = async () => {
      const books = JSON.parse(reader.result! as string);
      console.log('selectedFile:', books);
      try {
        await insertBooks({ books: books.slice(0, 2) });
      } catch (e) {
        console.log(e);
      }
      reader.onload = null;
    };
    reader.readAsText(selectedFile);
    input.disabled = false;
    input.onchange = null;
  };
  input.click();
};
</script>

<template>
  <div>
    <input hidden ref="domInputFile" type="file" />
    <button @click="onUploadClick">Upload</button>
    <div v-if="loading">In progess, wait please ...</div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
