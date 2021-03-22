import React from "react";
import classNames from 'classnames';
import PropsTypes from 'prop-types';

import './Status.scss';
import {Button} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";


const Status = ({user:{isOnline,fullname}}) => {
    return (
        <div className="chat__dialog-header">
            <div/>
            <div className="chat__dialog-header-center">
                <b className='chat__dialog-header-username'>{fullname}</b>
                <div className="chat__dialog-header-status">
                    <span className={classNames('status', {'status--online': isOnline})}>{isOnline ? 'online' : 'offline'}</span>
                </div>
            </div>
            <Button type="ghost" shape="circle" icon={<EllipsisOutlined style={{fontSize: '22px'}}/>}/>
        </div>
    )
};

Status.propTypes = {
    online: PropsTypes.bool,
};

export default Status;