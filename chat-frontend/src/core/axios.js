import axios from 'axios';

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['token'] = localStorage.getItem('token');

export default axios;