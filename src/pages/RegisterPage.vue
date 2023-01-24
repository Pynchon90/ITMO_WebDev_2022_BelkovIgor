<script setup lang="ts">
import { inject, ref } from 'vue';
import Routes from '../consts/Routes';
import RegistrationForm from '../components/RegistrationForm.vue';

const pb: any = inject('pb');
const errors = ref<string[]>([]);
const isSuccess = ref(false);

const handleRegister = async (data: any) => {
  console.log('> handleRegister', { ...data });
  errors.value = [];
  console.log('\t pb', pb);
  await pb
    .collection('users')
    .create({
      username: data.username,
      password: data.password,
      passwordConfirm: data.password,
    })
    .then((result: any) => {
      console.log('> handleRegister -> result:', result);
      isSuccess.value = true;
    })
    .catch((e: any) => {
      console.log('> handleRegister -> error:', e.data.data);
      const data = e.data.data;
      errors.value.push(e.toString());
      let item, message;
      for (item in data) {
        message = `${item}: ${data[item].message}`;
        errors.value.push(message);
      }
    });
};
</script>

<template>
  <RegistrationForm v-if="!isSuccess" title="Registration" :errors="errors" registration @register="handleRegister">
    <RouterLink :to="Routes.LOGIN">
      <small>Login</small>
    </RouterLink>
  </RegistrationForm>
  <div v-else>
    <h1 style="color: lightgreen">User registered successful</h1>
  </div>
</template>

<style scoped></style>
