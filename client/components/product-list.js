import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import Grid from '@material-ui/core/Grid'
import ProductCard from './product-card'
import {addProductThunk} from '../store/cart'

class DisconnectedProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    if (this.props.products[0]) {
      return (
        <div>
          <div id="products" className="container">
            <Grid container spacing={10} style={{padding: 24}}>
              {this.props.products.map(product => {
                return (
                  <Grid key={product.id} item xs={12} sm={6} lg={4} xl={3}>
                    {
                      <ProductCard
                        product={product}
                        addToCart={this.props.addToCart}
                        userId={this.props.user.id}
                      />
                    }
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(getProductsThunk()),
  addToCart: (id, qty, userId = 0) => dispatch(addProductThunk(id, qty, userId))
})

export default connect(mapState, mapDispatch)(DisconnectedProductList)
