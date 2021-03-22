import React from "react";
import orderBy from 'lodash/orderBy';
import {Input, Empty} from 'antd';


import {DialogItem} from "../";


import './Dialog.scss';

const Dialogs = ({items, value, onChangeEvent, userData, currentDialogId}) => {
    console.log(items)
    return (
        <div className='dialogs'>
            <div className="dialogs-search">
                <Input.Search
                    placeholder="Поиск среди контактов"
                    value={value}
                    onChange={e => onChangeEvent(e.target.value)}
                />
            </div>
            {
                (items.length !== 0) ? (orderBy(items, ['message.create_at'], ['desc']).map(item =>
                        <DialogItem
                            key={item._id}
                            {...item}
                            partner={item.partner._id === userData._id ? item.author : item.partner}
                            isMe={item.lastMessage && (item.lastMessage.user._id === userData._id)}
                            currentDialog={currentDialogId}
                        />)) :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Ничего не найдено'}/>
            }
        </div>
    )
};

export default Dialogs;