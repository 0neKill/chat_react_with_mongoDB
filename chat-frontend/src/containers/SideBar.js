import React, {useState} from 'react';
import {useSelector} from "react-redux";

import {SideBar as BaseSideBar} from './../components';
import {userApi,dialogsApi} from "../utils/api";

const SideBar = () => {
    const {data} = useSelector(state => state.user);

    const [visible, setVisible] = useState(false);
    const [valueUser, setValue] = useState(null);
    const [valueMessage, setValueMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);


    const handleSetMessage = e => {
        setValueMessage(e.target.value);
    }

    const handleVisible = () => {
        setValue(null);
        setVisible(state => !state);
    }

    const handleSearch = inputValue => {
        if (inputValue) {
            userApi.findUsers(inputValue)
                .then(({data}) => {
                    setUsers(data)
                })
        } else {
            setUsers([]);
        }
    };

    const handleCreate = () => {
        setLoading(true);
        const data = {
            partner:valueUser,
            text:valueMessage,
        }
        dialogsApi
            .createDialog(data)
            .finally(()=>{
                setLoading(false)
                setVisible(false)
                setValueMessage(null)
            })
    }

    const handleChange = value => {
        setValue(value)
    }

    return (
        <BaseSideBar
            users={users}
            userData={data}
            visible={visible}
            loading={loading}

            valueUser={valueUser}
            valueMessage={valueMessage}

            handleCreate={handleCreate}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleSetMessage={handleSetMessage}
            handleVisible={handleVisible}
        />
    )
};

export default SideBar;