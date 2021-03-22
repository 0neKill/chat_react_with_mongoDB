import {dialogsApi} from '../../utils/api';
import {userActions} from './';
import socket from "../../core/socket";

const action = {
    setDialogs: (items) => ({type: 'DIALOGS:SET_ITEMS', payload: items}),
    setCurrentDialog: (messagesID) => {
        socket.emit('DIALOGS:JOIN',messagesID)
        return ({type: 'DIALOGS:SET_CURRENT_DIALOG', payload: messagesID});
    },
    fetchDialogs: () => dispatch => {
        dialogsApi.getAll()
            .then(({data}) => {
                if (data.length > 0)
                    dispatch(action.setDialogs(data));
            })
            .catch(() => {
                localStorage.clear();
                dispatch(userActions.setIsAuth(false));
            })
    },

};
export default action;
