import React from "react";
import classNames from 'classnames';
import PropsTypes from 'prop-types';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

import {IconReaded, Avatar} from '../';
import {Link} from "react-router-dom";

const messageTime = created_at => {
    return isToday(new Date(created_at)) ?
        format(new Date(created_at), 'HH:mm') :
        format(new Date(created_at), 'dd.MM.yyyy')
}


const DialogItem = ({_id, currentDialog, unReaded, isReaded, partner, isMe = false, lastMessage}) => {
    return (
        <Link to={`/dialog/${_id}`}>
            <div className={classNames('dialogs__item', {
                'dialogs__item--online': partner.isOnline,
                'dialogs__item--selected': currentDialog === _id,
            })}>
                <div className="dialogs__item-avatar"><Avatar user={partner}/></div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{partner.fullname}</b>
                        {lastMessage && <span>{messageTime(lastMessage.createdAt)}</span>}
                    </div>
                    <div className="dialogs__item-info-bottom">
                        <p>{lastMessage && lastMessage.text ? (isMe ? 'Вы: ' + lastMessage.text : lastMessage.text) : lastMessage && lastMessage.attachments.length > 0 ?
                            'Картинка' : 'Пока что диалог пуст!'}</p>
                        {(!(unReaded > 0) && isMe) && <IconReaded isReaded={isReaded} isMe={true}/>}
                        {unReaded > 0 &&
                        <div
                            className="dialogs__item-info-bottom-count">{(unReaded > 9 ? '+9' : unReaded)}</div>}
                    </div>
                </div>
            </div>
        </Link>
    )
};

DialogItem.propTypes = {
    message: PropsTypes.object,
    user: PropsTypes.object,
};

export default DialogItem;
