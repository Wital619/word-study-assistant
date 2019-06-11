import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://word-study-assistant.firebaseio.com/'
});

export default instance;