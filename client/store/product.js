import axios from 'axios'
import {awaitExpression} from '@babel/types'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'
const GET_FEATURED = 'GET_FEATURED'
const UPDATE_RATING = 'UPDATE_RATING'
/**
 * INITIAL STATE
 */
const productList = {allProducts: {}, selectedProduct: {}, featuredProducts: []}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const getOneProduct = product => ({type: GET_ONE_PRODUCT, product})

const getFeatured = featuredProducts => ({type: GET_FEATURED, featuredProducts})

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    let userId = res.data.id || 0
    if (!userId) userId = 0
    const prodRes = await axios.get(`/api/products/?userId=${userId}`)
    dispatch(getProducts(prodRes.data))
  } catch (err) {
    console.error(err)
  }
}

export const getFeaturedThunk = () => async dispatch => {
  try {
    const res = await axios.get('api/products/featured')
    dispatch(getFeatured(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const getOneProductThunk = pId => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    let userId = res.data.id || 0
    if (!userId) userId = 0
    const prodRes = await axios.get(`/api/products/${pId}/?userId=${userId}`)
    dispatch(getOneProduct(prodRes.data))
  } catch (error) {
    console.error(error)
  }
}

export const newProductThunk = newData => async dispatch => {
  try {
    await axios({
      url: `/api/products`,
      method: 'POST',
      data: newData
    })
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateProductThunk = (pId, newData) => async dispatch => {
  try {
    await axios({
      url: `/api/products/${pId}`,
      method: 'PUT',
      data: newData
    })
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteProductThunk = pId => async dispatch => {
  try {
    await axios.delete(`/api/products/${pId}`)
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateRatingThunk = (pId, uId, stars) => async dispatch => {
  try {
    await axios({
      url: `/api/products/rec/${pId}`,
      method: 'PUT',
      data: {uId, stars}
    })
    const res = await axios.get(`/api/products/?userId=${uId}`)
    dispatch(getProducts(res.data))
    const prodRes = await axios.get(`/api/products/${pId}/?userId=${uId}`)
    dispatch(getOneProduct(prodRes.data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = productList, action) {
  const newBatchOfProducts = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case GET_PRODUCTS:
      newBatchOfProducts.allProducts = action.products
      return newBatchOfProducts
    case GET_ONE_PRODUCT:
      // return action.product
      newBatchOfProducts.selectedProduct = action.product
      return newBatchOfProducts
    case GET_FEATURED:
      newBatchOfProducts.featuredProducts = action.featuredProducts
      return newBatchOfProducts

    default:
      return state
  }
}
