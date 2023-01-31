import { useState } from 'nuxt/app';

const useUser = () => useState('user', ()=> ({}))
export default {useUser};