const initialState = {
    data: null,
    isAuth: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER:SET_DATA': {
            return {
                ...state,
                data: action.payload,
                token: localStorage.getItem('token')
            }
        }
        case 'USER:SET_IS_AUTH': {
            return {
                ...state,
                isAuth: action.payload,
            }
        }
        default:
            return state;
    }

}
