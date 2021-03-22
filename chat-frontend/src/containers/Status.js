import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {Status as BaseStatus} from '../components';

const Status = () => {
    const {dialogs: {currentDialog, item}, user: {data}} = useSelector(state => state);
    const [user, setUser] = useState();
    console.log(data)
    useEffect(() => {
        if (data && currentDialog && item.length > 0) {
            const objCurrentDialog = item.find(elem => elem._id === currentDialog);
            if (objCurrentDialog.author._id === data._id) {
                setUser(objCurrentDialog.partner)
            } else if (objCurrentDialog.partner._id === data._id) {
                setUser(objCurrentDialog.author)
            }
        }

    }, [currentDialog, item, data]);

    return (
        <>
            {
                user && currentDialog ? <BaseStatus user={user}/> : null
            }
        </>
    );
};
export default Status;