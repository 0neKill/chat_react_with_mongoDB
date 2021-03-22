import {messagesApi} from '../../utils/api/';
import {userActions} from "./";

const action = {
    setAllMessages: (items) => ({type: 'MESSAGES:SET_ITEM', payload: items}),
    updateAfterDelete: (messageId) => ({type: 'MESSAGES:DELETE_ITEM', payload: messageId}),
    fetchSendMessage: (objMessage) => async (dispatch) => {
        await messagesApi.send(objMessage)
    },
    fetchDeleteMessage: (messageId) => async (dispatch) => {
        dispatch(action.updateAfterDelete(messageId))
        await messagesApi.delete(messageId)
    },
    setMessages: (message) => (dispatch, getState) => {
        const {dialogs} = getState();
        const {currentDialog} = dialogs;
        if (currentDialog === message.dialog._id) {
            return dispatch({type: 'MESSAGE:SET_ITEM', payload: message});
        }
    },
    setLoading: (bool) => ({type: 'MESSAGES:SET_LOADING', payload: bool}),
    fetchCurrentDialog: (dialogId) => dispatch => {
        dispatch(action.setLoading(true));
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(action.setAllMessages(data))
        })
            .catch(() => {
                localStorage.clear()
                dispatch(userActions.setIsAuth(false));
            })
            .finally(() => dispatch(action.setLoading(false)))
    },
}
export default action;