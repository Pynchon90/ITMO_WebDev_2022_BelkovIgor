import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { ITodoVO } from '../model/vos/TodoVO';

const LOCAL_KEY_TODOS = 'todos';

interface State {
  todos: ITodoVO[];
  selected?: ITodoVO | null;
  isLoading: boolean;
}

export const useCounterStore = defineStore('todos', {
  state: (): State => ({
    todos: JSON.parse(localStorage.getItem(LOCAL_KEY_TODOS) as string) || [],
    selected: null,
    isLoading: false,
  }),
  getters: {
    isTodoNotSelected(): boolean {
      return !this.isSelectedActive;
    },
    isSelectedActive(state) {
      return !!state.selected;
    },
  },
  actions: {
    checkTodoSelect(todo: ITodoVO): boolean {
      return this.selected === todo;
    },
    selectTodo(todo: ITodoVO) {
      console.log('>store -> todo: checkTodoSelected =', { todo });
      return result;
    },
    deselectTodo(todo: ITodoVO) {
      console.log('> store -> todo:  ', { todo });
      this.selected = null;
    },
  },
});
