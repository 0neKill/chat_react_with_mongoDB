import React from 'react';
import classNames from 'classnames';
import {Empty, Spin} from 'antd';

import {Message} from '../'
import './Messages.scss';

const Messages = ({items, isLoading, messageRef, user, handleRemoveMessage, currentDialog, isTyping,partner}) => {
    console.log('partner === ',partner)
    console.log('user=========',user)
    return (
        <div className={classNames('messages', {'messages--loading': isLoading})} ref={messageRef}>
            {
                isLoading && !user ?
                    (<Spin size="large" tip="Загрузка сообщений..."></Spin>) :
                    currentDialog && items && !isLoading ?
                        (items.length !== 0) ?
                            (items.map(message => {
                                let audio = null;
                                message.attachments && message.attachments.map(item => {
                                    if (item.ext === 'audio/webm') audio = item.url;
                                    return item;
                                })
                                return (
                                    <Message key={message._id} {...message} isMe={message.user._id === user._id}
                                             audio={audio}
                                             handleRemoveMessage={handleRemoveMessage.bind(null, message._id)}/>)

                            })) :
                            (<Empty description='Диалог пуст'/>) :
                        (<Empty description='Откройте диалог'/>)
            }
            {isTyping && <Message isTyping={true} user={partner}/>}
        </div>
    )

    //     <Message
    //         avatar={'https://img1.akspic.ru/image/13314-blondin-model-ledi-devuska-krasota-1920x1080.jpg'}
    //         text={'Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻'}
    //         date='Tue Jul 21 2020 19:44:03'
    //         user={{fullName: 'Sasha '}}
    //         isMe={true}
    //         isReaded={true}
    //         attachment={
    //             [
    //                 {
    //                     filename: 'img',
    //                     url: 'https://mypensia.ru/uploads/images/g/a/m/gambol_i_darvin.jpg'
    //                 },
    //                 {
    //                     filename: 'img',
    //                     url: 'https://mypensia.ru/uploads/images/g/a/m/gambol_i_darvin.jpg'
    //                 },
    //                 {
    //                     filename: 'img',
    //                     url: 'https://mypensia.ru/uploads/images/g/a/m/gambol_i_darvin.jpg'
    //                 }
    //             ]
    //         }
    //
    //     />
    //     <Message
    //         avatar={'https://4tololo.ru/files/inline/images/f78283a40e6b37280ea9b11da224fadb.jpg'}
    //         text={'Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻'}
    //         date='Tue Jul 21 2020 19:44:03'
    //         user={{fullName: 'Sasha '}}
    //     />
    //     <Message
    //         avatar={'https://img1.akspic.ru/image/13314-blondin-model-ledi-devuska-krasota-1920x1080.jpg'}
    //         text={'Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻'}
    //         date='Tue Jul 21 2020 19:44:03'
    //         user={{fullName: 'Sasha '}}
    //         isMe={true}
    //         isReaded={false}
    //     />
    //     <Message avatar={'https://4tololo.ru/files/inline/images/f78283a40e6b37280ea9b11da224fadb.jpg'}
    //              isTyping={true}/>
    //     <Message avatar={'https://4tololo.ru/files/inline/images/f78283a40e6b37280ea9b11da224fadb.jpg'}
    //              date='Tue Jul 21 2020 19:44:03'
    //              attachment={
    //                  [
    //                      {
    //                          filename: 'img',
    //                          url: 'https://mypensia.ru/uploads/images/g/a/m/gambol_i_darvin.jpg'
    //                      },
    //
    //                  ]}/>
    //     <Message avatar={'https://4tololo.ru/files/inline/images/f78283a40e6b37280ea9b11da224fadb.jpg'}
    //              date='Tue Jul 21 2020 19:44:03'
    //              audio='https://notificationsounds.com/soundfiles/bc6dc48b743dc5d013b1abaebd2faed2/file-sounds-764-open-your-eyes-and-see.mp3'
    //     />
    // </>
};


export default Messages;
