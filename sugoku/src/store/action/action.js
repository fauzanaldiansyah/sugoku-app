export function setGameLevel(level) {
    return function (dispatch) {
        dispatch({
            type: 'SET_GAME_LEVEL',
            payload: {
                level: level
            }
        })
    }
}

export function setPlayerName(name) {
    return function (dispatch) {
        dispatch({
            type: 'SET_PLAYER_NAME',
            payload: {
                player: name
            }
        })
    }
}

export function setBoard(level) {
    console.log(level,'ini level di action')
    return function (dispatch) {
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'SET_BOARD',
                    payload: {
                        board: data.board
                    }
                })
            })
            .catch(err => console.log(err))
    }
}


export function setSolve(data) {

    const encodeBoard = (data) => data.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === data.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    return function (dispatch) {
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams({ board: data }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'sudahdispatch')
                dispatch({
                    type: 'SET_SOLVE',
                    payload: {
                        board: data.solution,
                        status: data.status
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export function setInput(data) {
    console.log(data, ' ini di action')
    return function (dispatch) {
        dispatch({
            type: 'SET_INPUT',
            payload: {
                board: data
            }
        })
    }
}

export function setCheck(data) {

    const encodeBoard = (data) => data.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === data.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    return function (dispatch) {
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams({ board: data }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'sudahdicheckdistoreaction')
                dispatch({
                    type: 'SET_CHECK',
                    payload: {
                        status: data.status
                    }
                })
            })
            .catch(err => console.log(err))
    }
}