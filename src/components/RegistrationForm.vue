<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  registration: boolean
  title: string
  errors: string[]
}>(), {
  registration: false,
});

const emit = defineEmits(['login', 'register'])

const inputUsername = ref<HTMLInputElement | null>(null);
const inputPassword = ref<HTMLInputElement | null>(null);
const inputConfirm = ref<HTMLInputElement | null>(null);

const checkPasswordsMatch = (): boolean => inputPassword.value!.value === inputConfirm.value?.value;

const onSendClick = async () => {
  const username = inputUsername.value!.value || '';
  const password = inputPassword.value!.value || '';
  const dto = { username, password };
  const canRegister = props.registration && checkPasswordsMatch();
  console.log('> RegistrationForm -> onSendClick', canRegister);
  if (canRegister) {
    emit('register', dto);
  } else {
    emit('login', dto);
  }
};
</script>

<template>
  <h1>{{ props.title }}</h1>
  <hr />
  <div v-if="props.errors.length > 0">
    <div v-for="(error, index) in errors" :key="index" style="color: red;">
      <small>{{ error }}</small>
    </div>
    <hr />
  </div>
  <div>
    <label for="username">Username:</label>
    <input ref="inputUsername" id="username" />
  </div>
  <div>
    <label for="password">Password:</label>
    <input ref="inputPassword" id="password" />
  </div>
  <div v-if="props.registration">
    <label for="confirm">Confirm:</label>
    <input ref="inputConfirm" id="confirm" />
  </div>
  <div style="margin: 1rem 0;">
    <button @click="onSendClick">Send</button>
  </div>
  <div>
    <slot/>
  </div>
</template>

<style scoped></style>
