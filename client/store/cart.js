import axios from 'axios'

const initCart = {}

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'

export const addProductOrChnageQty = (productId, qty) => {
  return {type: ADD_TO_CART, productId, qty}
}
export const removeProduct = productId => {
  return {type: DELETE_FROM_CART, productId}
}
const emptyCart = () => {
  return {type: EMPTY_CART}
}

export const submitOrderThunk = order => {
  return async dispatch => {
    try {
      await axios.put('/api/order', order)
      dispatch(emptyCart())
    } catch (error) {
      //Error Handling
      console.log(error)
    }
  }
}

export default function(cart = initCart, action) {
  const newCart = Object.assign({}, cart) // this a deep clone in the CURRENT CASE --- refactor if we add depth!!!
  switch (action.type) {
    case ADD_TO_CART:
      newCart[action.productId] = action.qty || 1
      break
    case DELETE_FROM_CART:
      delete newCart[action.productId]
      break
    case EMPTY_CART:
      state = initCart
      break
    default:
      break
  }
  return newCart
}
