import React from "react";

import './Auth.scss';

import {LoginForm, RegisterForm,CheckEmailForm} from "../../modules/";
import {Route} from "react-router-dom";

const Auth = (props) => {
    return (
        <section className='auth'>
            <div className="auth__content">
                <Route exact path={['/','/login']} component={LoginForm}/>
                <Route exact path='/register' component={RegisterForm}/>
                <Route path='/register/verify' component={CheckEmailForm}/>
            </div>
        </section>
    );
}
export default Auth;