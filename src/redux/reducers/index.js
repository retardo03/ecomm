import {combineReducers} from 'redux'
import Authreducers from './AuthReducers'
import HeaderReducers from './headerreducers'
export default combineReducers({
    Auth:Authreducers,
    Header:HeaderReducers
})