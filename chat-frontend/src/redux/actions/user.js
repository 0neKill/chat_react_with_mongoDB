import {userApi} from '../../utils/api';
import {openNotification} from "../../utils/helpers";
import axios from "../../core/axios";

const action = {
    setUserData: (data) => ({type: 'USER:SET_DATA', payload: data}),
    setIsAuth: (bool) => ({type: 'USER:SET_IS_AUTH', payload: bool}),
    fetchUserData: () => dispatch => {
        return userApi.getMe()
            .then(({data}) => {
                dispatch(action.setUserData(data));
            })
            .catch(() => {
                dispatch(action.setIsAuth(false));
                delete window.location.token;
            })
    },
    fetchUserRegister: (data) => dispatch => {
        return new Promise((resolve, reject) => {
            userApi.registerUser(data)
                .then(({data}) => {
                    openNotification({
                        type: data.status,
                        text: 'Регистрация успешна.',
                        title: 'Отлично!',
                    });
                    resolve(data);
                })
                .catch(reason => {
                    openNotification({
                        title: 'Ошибка при авторизации',
                        text: 'Неверный логин или пароль',
                        type: reason.status,
                    });
                    reject();
                })
        })
    },
    fetchUserLogin: (data) => dispatch => {
        return new Promise((resolve, reject) => {
            return userApi.getUserData(data)
                .then(({data}) => {
                    openNotification({
                        type: data.status,
                        text: 'Авторизация успешна.',
                        title: 'Отлично!',
                    });
                    localStorage.setItem('token', data.token);
                    axios.defaults.headers.common['token'] = localStorage.getItem('token');
                    dispatch(action.fetchUserData())
                        .then(() => {
                            dispatch(action.setIsAuth(true));
                        });
                    resolve(data)
                })
                .catch((err) => {
                    openNotification({
                        title: 'Ошибка при авторизации',
                        text: 'Неверный логин или пароль',
                        type: 'error',
                    });
                    reject();
                })
        })
    }
};
export default action;