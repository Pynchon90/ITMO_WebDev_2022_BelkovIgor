import { delay } from '../utils/generalUtils.js';

const CONST_WELCOME = 'Welcome';
class ServerService {
  constructor(url) {
    console.log('> ServerService -> constructor', url);
    this.url = url;
  }

  async requestTodos() {
    console.log(`>serverService -> requestTodos: ${CONST_WELCOME}`);
    const data = await fetch(`${this.url}/todos`, {
      method: 'GET',
    })
      .then((response) => {
        console.log(`> ServerService -> requestTodos: response = `, response);
        return response.ok ? response.json() : new Error('');
      })
      .catch((e) => {
        console.log(`> ServerService -> requestTodos: error = ${e}`);
        return [];
      });
    console.log(`> ServerService -> requestTodos: data = `, data);
    await delay(3000);
    return data;
  }
}
export default ServerService;
