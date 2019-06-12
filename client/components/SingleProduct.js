import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/cart'
import {getOneProductThunk} from '../store/product'
import Grid from '@material-ui/core/Grid'

const SingleProduct = props => {
  props.getOneProduct(props.match.params.pId)

  return (
    <div>
      <hi>{props.product.name}</hi>
    </div>
  )
}

const mapState = state => ({
  product: state.product.selectedProduct
})

const mapDisp = dispatch => ({
  getOneProduct: pId => dispatch(getOneProductThunk(pId))
})

export default connect(mapState, mapDisp)(SingleProduct)
