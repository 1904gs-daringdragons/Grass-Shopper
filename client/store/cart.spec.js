import {expect} from 'chai'
import {addProductOrChnageQty, removeProduct, submitOrderThunk} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart actions and thunks', () => {
  let store
  let mockAxios

  const initialState = {user: {}, cart: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('add product', () => {
    it('adds a key value pair to the cart with a qty', () => {
      addProductOrChnageQty(1, 5)
      addProductOrChnageQty(2, 4)
      addProductOrChnageQty(3, 3)
      expect(Object.keys(store.getState().cart).length).to.be.equal(3)
    })

    it('defaults qty to 1', () => {
      addProductOrChnageQty(34)
      expect(store.getState().cart[34]).to.be.equal(1)
    })
  })

  describe('changing qty', () => {
    it('updates the quautity in the store', () => {
      addProductOrChnageQty(34)
      expect(store.getState().cart[34]).to.be.equal(1)
      addProductOrChnageQty(34, 10)
      expect(store.getState().cart[34]).to.be.equal(10)
    })
  })

  describe('deleting item', () => {
    it('removes the item from the store', () => {
      addProductOrChnageQty(34, 10)
      expect(store.getState().cart[34]).to.be.equal(10)
      removeProduct(34)
      expect(store.getState().cart[34]).to.be(undefined)
    })
  })

  describe('successful order submit', () => {
    it('empties the cart', async () => {
      addProductOrChnageQty(3, 4)
      addProductOrChnageQty(56, 3)
      addProductOrChnageQty(10, 2)
      mockAxios.onPut('api/order').replyOnce(204, {success: true})
      await submitOrderThunk({})
      expect(Object.keys(store.getState().cart).length).to.be.equal(0)
    })
  })

  describe('failed order submit', () => {
    it('doesnt empty the cart', async () => {
      addProductOrChnageQty(3, 4)
      addProductOrChnageQty(56, 3)
      addProductOrChnageQty(10, 2)
      mockAxios.onPut('api/order').replyOnce(500, {success: false})
      await submitOrderThunk({})
      expect(store.getState().cart[56]).to.be.equal(3)
    })
  })
})
