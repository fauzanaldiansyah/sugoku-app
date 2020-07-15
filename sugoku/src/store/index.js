import { createStore, applyMiddleware, combineReducers} from 'redux'
import sudReducer from './reducer/sudReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({sudReducer})

const store = createStore(reducers, applyMiddleware(thunk) )

export default store