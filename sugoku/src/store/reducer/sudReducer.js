const initialState = {
    board: [],
    status: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PLAYER_NAME':
            return { ...state, player: action.payload.player }
        case 'SET_GAME_LEVEL':
            return { ...state, level: action.payload.level }
        case 'SET_BOARD':
            return { ...state, board: action.payload.board }
        case 'SET_SOLVE':
            return { ...state, board: action.payload.board, status: action.payload.status }
        case 'SET_INPUT':
            const [...newBoard] = state.board
            return { ...state, board: newBoard }
        case 'SET_CHECK':
            return { ...state, status: action.payload.status }
        default:
            return state
    }
}