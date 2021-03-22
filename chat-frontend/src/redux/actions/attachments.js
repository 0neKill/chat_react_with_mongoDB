const action = {
    removeAttachment: (files) => ({type: 'ATTACHMENTS:REMOVE_ATTACHMENT', payload: files}),
    setAttachments: (files) => ({type: 'ATTACHMENTS:SET_ATTACHMENTS', payload: files}),
};

export default action;