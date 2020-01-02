import { combineReducers} from 'redux'
import notes from './notes'
import tags from './tags'
import login from './login'
import users from './users'

export default combineReducers({
    login,
    notes,
    tags,
    users
})