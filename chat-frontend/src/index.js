import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import './styles/index.scss';
import 'emoji-mart/css/emoji-mart.css'

import App from './App';
import {userActions} from './redux/actions';
import store from './redux/store';

const render = () => {
    store.dispatch(userActions.fetchUserData())
    ReactDOM.render(
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
        ,
        document.getElementById('root')
    );



}
render();

