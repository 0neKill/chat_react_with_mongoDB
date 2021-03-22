import {notification,} from 'antd';

export default ({type, text, title}) => {
    notification[type]({
        duration:1.5,
        message: text,
        description: title
    });
};