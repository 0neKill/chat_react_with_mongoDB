import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Empty} from 'antd';
import socket from "../core/socket";

import {Dialogs as BaseDialogs} from '../components';
import {dialogsActions} from '../redux/actions';
import {useLocation} from "react-router-dom";

const Dialogs = ({item, fetchDialogs, setCurrentDialog, currentDialogId, userData}) => {
    const [value, setValue] = useState(null);
    const [newArray, setNewArray] = useState(item);
    const location = useLocation();

    useEffect(() => {
        if (!item.length) {
            fetchDialogs();
        } else {
            setNewArray(item);
        }
        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
        socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
        socket.on('SERVER:DELETE_MESSAGE', fetchDialogs);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs)
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs)
            socket.removeListener('SERVER:DELETE_MESSAGE', fetchDialogs)
        };
    }, [item, fetchDialogs])

    useEffect(() => {
        setCurrentDialog(location.pathname.split('/').pop());
    }, [location.pathname, setCurrentDialog])

    const onChangeEvent = value => {
        setNewArray(item.filter(item => ~item.partner.fullname.toLowerCase().indexOf(value.toLowerCase())))
        setValue(value);
    };
    return item ?
        <BaseDialogs
            items={newArray}
            value={value}
            onChangeEvent={onChangeEvent}
            currentDialogId={currentDialogId}
            userData={userData}
        /> :
        <Empty description={'У вас пока что нет сообщений'}/>

}

const mapStateToProps = ({dialogs}) => (dialogs)

export default connect(mapStateToProps, dialogsActions)(Dialogs);