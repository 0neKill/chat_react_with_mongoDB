const initialState = {
    items: null,
    isLoading: false,
};
const handleRemoveMessage = (messageId,items) => {
        return items.filter(item=>item._id !==messageId);
};

export default (state = initialState, action) => {
    switch (action.type) {
        case'MESSAGES:SET_ITEM': {
            return {...state, items: action.payload, isLoading: false}
        }
        case'MESSAGES:SET_LOADING': {
            return {...state, isLoading: action.payload}
        }
        case 'MESSAGE:SET_ITEM' : {
            return {...state, items: [...state.items, action.payload]}
        }
        case 'MESSAGES:DELETE_ITEM': {
            return {
                ...state,
                items:handleRemoveMessage(action.payload,state.items)
            }
        }

        default :
            return state;
    }
}