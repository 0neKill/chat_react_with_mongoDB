import {axios} from "../../core";

export default {
    getAll: () => axios.get('/dialogs'),
    createDialog: (data) => axios.post('/dialogs/create', data),
};