const initialsState = {
    attachments: []
};

export default (state = initialsState, action) => {
    switch (action.type) {
        case 'ATTACHMENTS:SET_ATTACHMENTS': {
            return {
                ...state,
                attachments: action.payload,
            }
        }
        case 'ATTACHMENTS:REMOVE_ATTACHMENT': {
            return {
                ...state,
                attachments: state.attachments.filter(attachment => attachment.uid !== action.payload),
            }
        }
        default:
            return state;
    }
};


