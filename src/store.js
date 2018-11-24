import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import rootReducer from './reducers'
// import createHistory from 'history/createBrowserHistory'

// const history = createHistory()

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store