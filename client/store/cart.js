import axios from 'axios'

const initCart = {}

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'

export const addProduct = (product, qty) => {
  return {type: ADD_TO_CART, product, qty}
}
export const removeProduct = productId => {
  return {type: DELETE_FROM_CART, productId}
}
const emptyCart = () => {
  return {type: EMPTY_CART}
}

export const addProductThunk = (productId, qty) => {
  return async dispatch => {
    try {
      const product = await axios.get(`/api/products/${productId}`)
      dispatch(addProduct(product.data, qty))
    } catch (error) {
      //Error Handling
      console.log(error)
    }
  }
}

export const submitOrderThunk = order => {
  return async dispatch => {
    try {
      await axios.put('/api/orders', order)
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
      if (newCart[action.product.id]) {
        newCart[action.product.id].quantity += action.qty
      } else {
        newCart[action.product.id] = {...action.product, quantity: action.qty}
      }
      break
    case DELETE_FROM_CART:
      delete newCart[action.productId]
      break
    case EMPTY_CART:
      return initCart
    default:
      break
  }
  return newCart
}
