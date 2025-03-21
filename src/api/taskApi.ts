import axios from 'axios';

const TASKS_API_URL = process.env.REACT_APP_TASKS_API_URL;

const taskApi = axios.create({
  baseURL: TASKS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default taskApi;
