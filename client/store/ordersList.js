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
    dispatch(setOrdersOnState(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderThunk = (orderId, orderStatus) => async dispatch => {
  try {
    await axios({
      url: `/api/orders/${orderId}`,
      method: 'PUT',
      data: {orderStatus}
    })
    const res = await axios.get('/api/orders')
    dispatch(setOrdersOnState(res.data))
  } catch (error) {
    console.log(error)
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
