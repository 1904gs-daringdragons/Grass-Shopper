import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import Grid from '@material-ui/core/Grid'
import ProductCard from './product-card'
import {addProductThunk} from '../store/cart'
import ProductCarousel from './product-carousel'
import {Paper} from '@material-ui/core'
import Pagination from 'material-ui-flat-pagination'

class DisconnectedProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0
    }
  }
  componentDidMount() {
    this.props.getAllProducts()
  }
  handleClick(offset) {
    this.setState({offset})
  }
  render() {
    if (this.props.products[0]) {
      return (
        <div>
          <ProductCarousel />
          <div id="products" className="container">
            <Grid container spacing={10} style={{padding: 24}}>
              {this.props.products
                .slice(this.state.offset, this.state.offset + 6)
                .map(product => {
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
              <Grid item xs={12} container justify="center" alignItems="center">
                <Paper>
                  <Pagination
                    limit={6}
                    offset={this.state.offset}
                    total={this.props.products.length}
                    onClick={(e, offset) => this.handleClick(offset)}
                  />
                </Paper>
              </Grid>
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
  products: state.products.allProducts,
  user: state.user
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(getProductsThunk()),
  addToCart: (id, qty, userId = 0) => {
    // console.log(qty);
    dispatch(addProductThunk(id, qty, userId))
  }
})

export default connect(mapState, mapDispatch)(DisconnectedProductList)
