import axios from 'axios'

const SET_ORDERS_LIST_VIEW = 'SET_ORDERS_LIST_VIEW'

const setOrdersOnState = orderList => ({
  type: SET_ORDERS_LIST_VIEW,
  orderList
})

export const getOwnOrdersThunk = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}`)
    dispatch(setOrdersOnState(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getAllOrdersThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    console.log(res.data)
    dispatch(setOrdersOnState(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_ORDERS_LIST_VIEW:
      return action.orderList
    default:
      break
  }
  return state
}
