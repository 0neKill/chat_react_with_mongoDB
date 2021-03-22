import {axios} from '../../core';

const options = (files) => {
    const attachmentsObj = new FormData();
    attachmentsObj.append('attachments', files);
    return attachmentsObj;
}

export default {
    setAttachments: (attachment) => axios.post('/files', options(attachment), {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}