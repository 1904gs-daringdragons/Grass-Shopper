import {expect} from 'chai'
import {
  addProduct,
  changeQuantity,
  removeProduct,
  submitOrderThunk
} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const prod1 = {
  name: 'weed',
  id: 1,
  price: 5.0,
  imgUrl: 'google.com',
  description: 'good'
}
const prod2 = {
  name: 'pot',
  id: 2,
  price: 6.0,
  imgUrl: 'goggle.com',
  description: 'nice'
}

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
      store.dispatch(addProduct(prod1, 5))
      store.dispatch(addProduct(prod2, 4))
      store.dispatch(addProduct(prod1, 3))
      const actions = store.getActions()
      expect(actions.length).to.be.equal(3)
    })
  })

  describe('changing qty', () => {
    it('updates the quantity in the store', () => {
      store.dispatch(addProduct(prod2, 10))
      let actions = store.getActions()
      expect(actions.length).to.be.equal(1)
      store.dispatch(changeQuantity(2, 5))
      actions = store.getActions()
      expect(actions.length).to.be.equal(2)
      expect(actions[0].product.id).to.be.equal(2)
      expect(actions[1].productId).to.be.equal(2)
    })
  })

  describe('successful order submit', () => {
    it('empties the cart', async () => {
      store.dispatch(addProduct(prod1, 4))
      store.dispatch(addProduct(prod2, 3))
      mockAxios.onPost('/api/orders').replyOnce(204)
      await store.dispatch(submitOrderThunk(store.cart))
      const actions = store.getActions()
      expect(actions.length).to.be.equal(3)
    })
  })

  describe('failed order submit', () => {
    it('doesnt empty the cart', async () => {
      store.dispatch(addProduct(prod1, 4))
      store.dispatch(addProduct(prod2, 3))
      mockAxios.onPut('/api/orders').replyOnce(500)
      await store.dispatch(submitOrderThunk({}))
      const actions = store.getActions()
      expect(actions.length).to.be.equal(2)
    })
  })
})
