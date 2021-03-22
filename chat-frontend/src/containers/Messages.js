import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import socket from '../core/socket';

import {messagesActions} from '../redux/actions';
import {Messages as BaseMessages} from '../components';

const Messages = () => {
    const {dialogs: {currentDialog}, messages: {items, isLoading}, user: {data}} = useSelector(state => state);

    const [isTyping, setTyping] = useState(false);
    const [partner, setPartner] = useState(null);
    const dispatch = useDispatch();
    const messageRef = useRef(null);
    const timer = useRef(0);

    const handleAddNewMessage = message => {
        dispatch(messagesActions.setMessages(message))
    };
    const handlerSetTyping = (partner) => {
        setPartner(partner.data);
        setTyping(true);
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setTyping(false);
            setPartner(null)
        }, 3000);
    }
    const handleRemoveMessage = messageId => {
        dispatch(messagesActions.fetchDeleteMessage(messageId));
    };
    useEffect(() => {
        socket.on("DIALOGS:TYPING", handlerSetTyping);
        return () => {
            socket.remove("DIALOGS:TYPING", handlerSetTyping);
            clearTimeout(timer.current)
        }

    }, [])

    useEffect(() => {
        if (currentDialog) {
            dispatch(messagesActions.fetchCurrentDialog(currentDialog));
        }
        ;
        socket.on('SERVER:NEW_MESSAGE', handleAddNewMessage);
        socket.on('SERVER:DELETE_MESSAGE', handleRemoveMessage);
        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', handleAddNewMessage);
            socket.removeListener('SERVER:DELETE_MESSAGE', handleRemoveMessage);
        };
    }, [currentDialog]);

    useEffect(() => {
        messageRef.current.scrollTo(0, 999999999);
    }, [items]);
    return <BaseMessages
        currentDialog={currentDialog}
        items={items}
        isTyping={isTyping}
        isLoading={isLoading}
        messageRef={messageRef}
        user={data}
        partner={partner}
        handleRemoveMessage={handleRemoveMessage}/>
};
// const mapStateToProps = ({dialogs, messages}) => ({
//     currentDialog: dialogs.currentDialog, items: messages.items
// });
export default Messages;
