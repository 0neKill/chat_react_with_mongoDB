import {axios} from '../../core';

export default {
    getUserData: (values) => axios.post('/user/login', values),
    registerUser: (values) => axios.post('/user/register', values),
    verifyUser: (hash) => axios.get('/user/verify?hash=' + hash),
    getMe: () => axios.get('/user/'),
    findUsers: (inputValue) => axios.get('/user/find?query=' + inputValue),
}