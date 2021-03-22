import React from 'react';

import './Home.scss';

import {Messages, ChatInput, Status, SideBar} from '../../containers';
import {useSelector} from "react-redux";

const Home = (props) => {
    const {user} = useSelector(state=>state)
    return (
        <section className='home'>

            {user && <div className="chat">
                <SideBar/>
                <div className="chat__dialog">
                    <Status/>
                    <div className="chat__dialog-messages">
                        <Messages/>
                    </div>
                    <div className="chat__dialog-input">
                        <ChatInput/>
                    </div>
                </div>
            </div>}

        </section>
    )
}
export default Home;