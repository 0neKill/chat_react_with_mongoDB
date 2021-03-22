import {axios} from '../../core';

export default {
    getAllByDialogId: (dialogId) => axios.get('/messages?dialog=' + dialogId),
    send: (objMessage) => axios.post('/messages', objMessage),
    delete:(messageId)=>axios.delete(`/messages/${messageId}`)
};

