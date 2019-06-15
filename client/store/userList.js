import axios from 'axios'
import history from '../history'

const SET_LIST = 'SET_LIST'

const setUserListOnState = userList => {
  return {type: SET_LIST, userList}
}

export const userListThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(setUserListOnState(res.data))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_LIST:
      return action.userList
    default:
      break
  }
  return state
}
