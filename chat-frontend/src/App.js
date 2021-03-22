import React from 'react';
import {Auth, Home} from "./pages";
import {Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

const App = () => {
    const {isAuth} = useSelector(state => state.user);
    return (
        <div className='wrapper'>
            <Switch>
                {
                    isAuth ?
                        <Route exact path={['/','/dialog/:id']} component={Home}/>
                        :
                        <Route exact path={['/', '/login', '/register','/register/verify']} component={Auth}/>
                }
                {/*<Route exact path={['/', '/login', '/register']} component={Auth}/>*/}
                {/*<Route path='/im' component={Home}/>*/}
                {/*{isAuth ? <Redirect to='im'/> : <Redirect to='/login'/>}*/}
                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </div>
    )
}

export default App;
