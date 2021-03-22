import React from 'react';
import {Input, Button} from "antd";
import {UploadField} from '@navjobs/upload';
import {Picker} from 'emoji-mart'
import {SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined, AudioMutedOutlined} from '@ant-design/icons';

import {UploadFile} from '../';
import './ChatInput.scss';

const ChatInput = ({
                       value,
                       setValue,
                       emojiPicker,
                       messageInput,
                       handleAddEmoji,
                       toggleVisibleEmoji,
                       setAttachments,
                       attachments,
                       removeAttachment,
                       handleOnHideRecord,
                       handlerOnRecord,
                       isRecording
                   }) => {

    return (
        <>
            <div className='chat-input'>
                <div className="chat-input__smile-btn">
                    {
                        emojiPicker && <div className="chat-input__emoji-picker">
                            <Picker onSelect={handleAddEmoji}/>
                        </div>
                    }
                    <Button type="ghost" shape="circle" icon={<SmileOutlined/>} onClick={toggleVisibleEmoji}/>
                </div>
                {
                    isRecording ? (
                        <div className="chat-input__record-status">
                            <i className="chat-input__record-status-bubble"></i>
                            <span className='chat-input__record-status-title'>Recording...</span>
                            <Button className='chat-input__record-status--close' onClick={handleOnHideRecord}>
                                <AudioMutedOutlined/>
                            </Button>
                        </div>
                    ) : (

                        <Input
                            size='large'
                            placeholder="Введите текст сообщения…"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyUp={messageInput}
                        />
                    )
                }


                <div className="chat-input__actions">
                    <UploadField
                        onFiles={files => setAttachments(files)}
                        containerProps={{
                            className: 'chat-input__actions-upload-btn'
                        }}
                        uploadProps={{
                            accept: ".jpg,.jpeg,.png,.gif,.bmp",
                            multiple: "multiple"
                        }}
                    >
                        {
                            attachments.length < 6 && <Button type="ghost" shape="circle" icon={<CameraOutlined/>}/>
                        }
                    </UploadField>
                    {isRecording || value || attachments.length > 0 ?
                        <Button onClick={messageInput} type="ghost" shape="circle" icon={<SendOutlined/>}/>
                        : (<div className="chat-input__record-btn">
                            <Button onClick={handlerOnRecord} type="ghost" shape="circle" icon={<AudioOutlined/>}/>
                        </div>)
                    }
                </div>
            </div>
            <div className="chat-input__attachments">
                {<UploadFile attachments={attachments} removeAttachment={removeAttachment}/>}
            </div>
        </>
    )
};


export default ChatInput;