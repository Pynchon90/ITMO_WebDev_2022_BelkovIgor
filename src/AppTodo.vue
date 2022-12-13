<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { onMounted, watch, computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { alpha, helpers, minLength, required, and, or } from '@vuelidate/validators';
import Spinner from '@/components/Spinner.vue';
import type { ITodoVO } from '@/model/vos/TodoVO';
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
const LOCAL_KEY_TEXT = 'text';
const getLocalText = () => localStorage.getItem(LOCAL_KEY_TEXT) || '';
const setInputTitleText = (text: string) => (inputTitleText.value = text);
const setDomButtonCreateText = (text: string) => ((domButtonCreate.value! as HTMLElement).innerText = text);
const domButtonCreate = ref(null);
const inputTitleText = ref(getLocalText());
const store = useTodosStore();
const { todos, isLoading } = storeToRefs(store);
const { checkTodoSelected } = store;
const cyrillicValidator = helpers.regex(/^[А-Яа-яёЁ]+$/i);
const validator = useVuelidate(
    {
      inputTitleText: {
        isValid: and(required, minLength(3), or(alpha, cyrillicValidator)),
      },
    },
    { inputTitleText },
);
const validate = () => validator.value.$validate();
const isActionButtonDisabled = computed(() => {
  return validator.value.inputTitleText.$error || store.compareTextWithSelectedTodoTitle(inputTitleText.value);
});
const resetInputText = () => setInputTitleText('');
const selectTodo = (todo: ITodoVO) => {
  store.setupSelectedTodo(todo);
  setInputTitleText(todo.title);
  setDomButtonCreateText('Update');
};
const deselectTodo = () => {
  store.setupSelectedTodo(null);
  setInputTitleText(getLocalText());
  setDomButtonCreateText('Create');
};
const onTodoListItemClicked = (todo: ITodoVO) => {
  console.log('> onTodoListItemClicked', todo);
  if (store.checkTodoSelected(todo)) {
    deselectTodo();
  } else {
    selectTodo(todo);
  }
};
const onDeleteTodo = (todo: ITodoVO) => {
  console.log('> onTodoListItemClicked', todo);
  if (store.checkTodoSelected(todo)) {
    deselectTodo();
  }
  store.deleteTodo(todo);
};
const onCreateButtonClick = () => {
  console.log('> onCreateButtonClick', store.hasSelectedTodo);
  if (store.hasSelectedTodo) {
    store.updateSelectedTodoTitle(inputTitleText.value);
    deselectTodo();
  } else {
    store.createTodoFromText(inputTitleText.value);
    resetInputText();
  }
  validate();
};
const getTodoRoute = (index: number) => `/todo/${index}`;
watch(inputTitleText, (value) => {
  console.log('input', inputTitleText);
  if (!store.hasSelectedTodo) {
    localStorage.setItem(LOCAL_KEY_TEXT, value);
  }
});
onMounted(() => validate());
</script>
<template>
  <Spinner v-if="isLoading" />
  <main v-else>
    <Transition  ></Transition>
    <input v-model="inputTitleText" @keyup.enter="onCreateButtonClick" @keyup="validate" />
    <button ref="domButtonCreate" @click="onCreateButtonClick" :disabled="isActionButtonDisabled">Create</button>
    <vs-list>
      <vs-list-item
          v-for="(todo, index) in todos"
          @click.self="onTodoListItemClicked(todo)"
          :class="{ selected: checkTodoSelected(todo) }"
          :key="todo.id"
          :title="todo.title"
      >
        <vs-row vs-align="center" class="todo-item">
          <RouterLink :to="getTodoRoute(index)" class="open-todo-link">Open</RouterLink>
          <vs-button color="danger" type="flat" @click="onDeleteTodo(todo)">Delete</vs-button>
          <vs-switch color="success" v-model="todo.isCompleted"  />
        </vs-row>
      </vs-list-item>
    </vs-list>
  </main>
</template>
<style lang="scss" scoped>
.open-todo-link {
  transition: all 0.1s ease-out;
  font-size: 1em;
  &:hover {
    font-size: 1.2em;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}


.todo-item {
  *:not(:last-child){
    margin-right: 0.5rem;
  }
}

.open-todo-link{
  transition: all 0.1s ease-out;
  font-size: 1em;

  &:hover{
font-size: 1.2em;
  }
}
.selected {
  background-color: #f1f1f1;
  outline: 1px solid #ccc;
}
.delete {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  zoom: 0.5;
}
li {
  padding: 0.25rem;
  margin: 0.25rem 0;
  user-select: none;
  position: relative;
  box-sizing: border-box;
  &:hover {
    background-color: #fcfcfc;
    & > button {
      &.delete {
        display: block;
      }
    }
  }
}
</style>
