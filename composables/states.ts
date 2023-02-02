const getStateOrFetchWhenAbsent = (key: string, path: string, useEnvSettingsAPI = true): any => {
  const state = useState(key);
  if (!state.value) {
    const setting = useRuntimeConfig();
    const url = useEnvSettingsAPI ? `${setting.DATA_API}${path}` : path;
    state.value = useFetch(url);
  }
  return state.value;
}

export const useUser = () => ({
  getUser: (): any => {
    return getStateOrFetchWhenAbsent('user', '/users/1');
  }
});

export const useBooks = () => ({
  getAll: (): any => {
    return getStateOrFetchWhenAbsent('books', '/api/books', false);
  }
});