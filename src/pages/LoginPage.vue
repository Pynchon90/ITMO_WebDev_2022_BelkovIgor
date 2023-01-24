<script setup lang="ts">
import { inject, ref } from 'vue';
import Routes from '../consts/Routes';

import RegistrationForm from '../components/RegistrationForm.vue';

const pb: any = inject('pb');
const errors = ref<string[]>([]);
const isSuccess = ref(pb.authStore.isValid);

console.log('> UserLoginPage -> isSuccess:', isSuccess);

const handleLogin = async (data: any) => {
  console.log('> handleLoginClick', data);
  errors.value = [];
  console.log('\t pb', pb);
  await pb
    .collection('users')
    .authWithPassword(data.username, data.password)
    .then((result: any) => {
      console.log('> handleLoginClick -> result:', result);
      isSuccess.value = true;
    })
    .catch((e: any) => {
      console.log('> handleLoginClick -> error:', e.data.data);
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
  <RegistrationForm title="Login" v-if="!isSuccess" :errors="errors" @login="handleLogin">
    <RouterLink :to="Routes.REGISTER">
      <small>Register</small>
    </RouterLink>
  </RegistrationForm>
  <div v-else>
    <h1 style="color: lightgreen">User login successful</h1>
    <RouterLink :to="Routes.BOOKS"> Books </RouterLink>
    <RouterLink :to="Routes.INDEX"> Home </RouterLink>
  </div>
</template>

<style scoped></style>
