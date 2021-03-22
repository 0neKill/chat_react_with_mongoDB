const initialState = {
    item: [],
    currentDialog: window.location.href.split('dialog/')[1],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'DIALOGS:SET_ITEMS': {
            return {
                ...state,
                item: action.payload,
            };
        }
        case 'DIALOGS:SET_CURRENT_DIALOG': {
            return {
                ...state,
                currentDialog: action.payload,
            }
        }
        default:
            return state;
    }
}