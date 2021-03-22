import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {ChatInput as BaseChatInput} from '../components';
import {messagesActions, attachmentsActions} from '../redux/actions'
import {attachmentsApi} from '../utils/api/';
import {openNotification} from '../utils/helpers';
import socket from "../core/socket";


const ChatInput = () => {
    const [value, setValue] = useState(null);
    const [isRecording, setRecording] = useState(null);
    const [isMediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPicker, setEmojiPicker] = useState(false);
    const attachmentsArray = useRef([]);

    const {dialogs: {currentDialog}, attachments: {attachments}, user: {data}} = useSelector(state => state);
    const dispatch = useDispatch();
    window.navigator.getUserMedia = (window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia);

    const onError = function (err) {
        openNotification({
            title: 'Ошибка при попытке получить доступ к микрофону',
            text: 'Микрофон',
            type: 'error',
        });
    }

    const handlerOnRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, onRecording, onError);
        } else {
            console.log('isnt asdasdas record')
        }
    }


    const onRecording = function (stream) {
        const mediaRecorder = new window.MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        mediaRecorder.start();
        mediaRecorder.onstart = () => {
            setRecording(true)
        }
        mediaRecorder.onstop = () => {
            setRecording(false);
        }
        mediaRecorder.ondataavailable = (e) => {
            console.log(e.data)

            const file = new File([e.data], 'audio.webm', {type: 'audio/webm'});
            attachmentsApi.setAttachments(file)
                .then(({data}) => {
                    const item = {
                        _id: data.file._id,
                        name: data.file.fileName,
                        url: data.file.url,
                        status: 'done',
                    }
                    attachmentsSend([...attachments, item])
                })
        }
    }
    const attachmentsSend = (array = attachments) => {
        const objMessage = {
            dialog: currentDialog,
            text: value,
            attachments: array,
        }
        dispatch(attachmentsActions.setAttachments([]));
        attachmentsArray.current = []
        dispatch(messagesActions.fetchSendMessage(objMessage));
    }


    const createMessage = text => {
        if (isRecording) {
            isMediaRecorder.stop();
        } else {
            attachmentsSend();
        }

        // const objMessage = {
        //     dialog: currentDialog,
        //     text: text,
        //     attachments: [...attachments, ...audioArray],
        // }
        // dispatch(attachmentsActions.setAttachments([]));
        // attachmentsArray.current = []
        // dispatch(messagesActions.fetchSendMessage(objMessage));
    }

    const toggleVisibleEmoji = () => {
        setEmojiPicker(state => !state);
    }
    const setAttachments = (files) => {

        const newMass = Object.values(files);
        if (attachmentsArray.current.length + newMass.length > 6) {
            openNotification({
                title: 'Ошибка при дабовление',
                text: 'Нельзя отправлять больше 6 файлов',
                type: 'error',
            });
            return null;
        }
        newMass.forEach(value => {
            const uid = Math.random();
            attachmentsArray.current = [
                ...attachmentsArray.current,
                {
                    uid: uid,
                    name: value.name,
                    percent: 50,
                    status: 'uploading',
                }
            ];
            dispatch(attachmentsActions.setAttachments(attachmentsArray.current));
            attachmentsApi
                .setAttachments(value)
                .then(({data}) => {
                    attachmentsArray.current = attachmentsArray.current.map(item => {
                        if (item.uid === uid) {
                            item = {
                                _id: data.file._id,
                                uid: data.file._id,
                                name: data.file.name,
                                url: data.file.url,
                                status: 'done',
                            }
                        }
                        return item;
                    });
                })
                .finally(() => {
                    dispatch(attachmentsActions.setAttachments(attachmentsArray.current))
                })
        });
    }
    const messageInput = e => {
        socket.emit('DIALOGS:TYPING', {currentDialog, data})
        if ((isRecording || value || attachments.length > 0) && (e.key === 'Enter' || e.type === 'click')) {
            createMessage(value);
            setValue(null)
        }
    }

    const handleAddEmoji = ({colons}) => {
        setValue(value => `${value}${colons}`)
    }
    const handleRemoveAttachment = (file) => {
        attachmentsArray.current = attachmentsArray.current.filter(item => item._id !== file);
        dispatch(attachmentsActions.removeAttachment(file))
    }
    const handleOnHideRecord = () => {
        setRecording(false);
    }

    return (
        <>
            {
                currentDialog && <BaseChatInput
                    removeAttachment={handleRemoveAttachment}
                    handleOnHideRecord={handleOnHideRecord}
                    handlerOnRecord={handlerOnRecord}
                    setAttachments={setAttachments}
                    attachments={attachments}
                    setValue={setValue}
                    emojiPicker={emojiPicker}
                    setEmojiPicker={setEmojiPicker}
                    toggleVisibleEmoji={toggleVisibleEmoji}
                    messageInput={messageInput}
                    handleAddEmoji={handleAddEmoji}
                    value={value}
                    isRecording={isRecording}
                />

            }
        </>
    )
};
export default ChatInput;