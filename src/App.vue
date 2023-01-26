<script setup lang="ts">
import MainHeader from './components/MainHeader.vue';
import { ref } from 'vue';
import userModel from './model/UserModel';
import { useRouter } from 'vue-router';
import Routes from './consts/Routes';

const router = useRouter();
const userData = ref(userModel!.userData);

userModel.observerUserData.addListener(() => {
  console.log('> App -> observerUserData: listener', userModel!.userData);
  userData.value = userModel!.userData;
});

const onMainHeaderLogout = () => {
  console.log('> App -> onMainHeaderLogout');
  userModel.cleanUserData()
    .then(() => {
      router.replace({ path: Routes.INDEX });
    })
    .catch((error) => {
      console.log('> App -> onMainHeaderLogout: error =', error);
    });
}
</script>

<template>
  <MainHeader :user-data="userData" @logout="onMainHeaderLogout" />
  <RouterView v-slot="{ Component }" style="padding: 2rem;">
    <Component :is="Component" />
  </RouterView>
</template>

<style scoped></style>
