import axios from 'axios'
import history from '../history'
import {userListThunk} from './userList'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    const {id} = res.data
    let cart = localStorage.getItem('localCart')
    if (cart) {
      cart = JSON.parse(cart)
      for (let product in cart) {
        if (cart[product].id) {
          await axios({
            url: '/api/cart/',
            method: 'PUT',
            data: {userId: id, productId: product, qty: cart[product].quantity}
          })
        }
      }
    }
    localStorage.setItem('localCart', {})
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const editUserInfo = user => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}/userInfo`, user)
    const returnedUser = res.data
    dispatch(updateUser(returnedUser))
  } catch (err) {
    console.error(err)
  }
}

export const editUserAdminStatus = (id, isAdmin) => async dispatch => {
  try {
    const res = await axios({
      url: `/api/users/${id}/admin`,
      method: 'PUT',
      data: {isAdmin}
    })
    dispatch(userListThunk())
  } catch (err) {
    console.error(err)
  }
}

export const changePassword = (
  userId,
  formerPassword,
  newPassword
) => async dispatch => {
  try {
    // const {id} = user
    const res = await axios.put(`api/users/${userId}/password`, {
      formerPassword,
      newPassword
    })
    // const returnedUser = res.data
    dispatch(updateUser(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

//SELECTOR
export const displayUserInfoName = (firstName, email) => {
  if (firstName === '' || !firstName) return email
  else return firstName
}
