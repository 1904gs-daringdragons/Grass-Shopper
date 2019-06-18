import axios from 'axios'

const initCart = {}

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const GET_CART = 'GET_CART'

export const addProduct = (product, qty) => {
  return {type: ADD_TO_CART, product, qty}
}
export const removeProduct = productId => {
  return {type: DELETE_FROM_CART, productId}
}
export const emptyCart = () => {
  return {type: EMPTY_CART}
}
export const changeQuantity = (productId, qty) => {
  return {type: CHANGE_QUANTITY, productId, qty}
}

export const getCart = cart => {
  return {type: GET_CART, cart}
}

export const addProductThunk = (productId, qty = 1, userId) => {
  return async (dispatch, getState) => {
    try {
      const product = await axios.get(`/api/products/${productId}`)
      if (getState().cart[productId])
        qty = getState().cart[productId].quantity + qty
      qty = Math.min(product.data.quantity, qty)
      if (userId) {
        await axios({
          url: '/api/cart/',
          method: 'PUT',
          data: {userId, productId, qty}
        })
      }
      dispatch(addProduct(product.data, qty))
      dispatch(getCartThunk(userId))
    } catch (error) {
      //Error Handling
      console.log(error)
    }
  }
}

export const submitOrderThunk = order => {
  return async dispatch => {
    try {
      await axios.post('/api/orders', order)
      dispatch(emptyCart())
    } catch (error) {
      //Error Handling
      console.log(error)
    }
  }
}

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      let cart = {}
      if (!userId) cart = JSON.parse(localStorage.getItem('localCart'))
      if (userId) {
        const res = await axios.get(`/api/cart/${userId}`)
        cart = res.data
      }
      dispatch(getCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const emptyCartThunk = () => {
  return dispatch => {
    try {
      dispatch(emptyCart())
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProductThunk = (userId, productId) => {
  return async dispatch => {
    try {
      if (userId) await axios.delete(`/api/cart/${userId}/${productId}`)
    } catch (error) {
      console.log(error)
    }
    dispatch(removeProduct(productId))
  }
}

export const changeQuantityThunk = (userId, productId, qty) => {
  return async dispatch => {
    try {
      const product = await axios({
        url: `/api/products/${productId}`,
        method: 'GET'
      })
      qty = Math.min(product.data.quantity, qty)
      console.log(qty)
      if (userId) {
        await axios({
          url: `/api/cart/${productId}`,
          method: 'PUT',
          data: {userId, qty}
        })
      }
      dispatch(changeQuantity(productId, qty))
      dispatch(getCartThunk(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(cart = initCart, action) {
  const newCart = JSON.parse(JSON.stringify(cart)) // this a deep clone in the CURRENT CASE --- refactor if we add depth!!!
  switch (action.type) {
    case ADD_TO_CART:
      newCart[action.product.id] = {...action.product, quantity: action.qty}
      localStorage.setItem('localCart', JSON.stringify(newCart))
      break
    case DELETE_FROM_CART:
      delete newCart[action.productId]
      localStorage.setItem('localCart', JSON.stringify(newCart))
      break
    case EMPTY_CART:
      localStorage.setItem('localCart', '')
      return initCart
    case CHANGE_QUANTITY:
      newCart[action.productId] = {
        ...newCart[action.productId],
        quantity: action.qty
      }
      localStorage.setItem('localCart', JSON.stringify(newCart))
      break
    case GET_CART:
      return {...action.cart}
    default:
      break
  }
  return newCart
}
