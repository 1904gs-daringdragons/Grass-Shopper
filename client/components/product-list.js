import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import ProductCard from './product-card'
import {addProductThunk} from '../store/cart'
import ProductCarousel from './product-carousel'
import {Paper, Select, MenuItem, Grid} from '@material-ui/core'
import Pagination from 'material-ui-flat-pagination'
import Typography from '@material-ui/core/Typography'

class DisconnectedProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      filter: 'All'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getAllProducts()
  }
  handleClick(offset) {
    this.setState({offset})
  }
  handleChange(e) {
    const {value} = e.target
    this.setState({filter: value})
  }
  render() {
    if (this.props.products[0]) {
      return (
        <div>
          <ProductCarousel />
          <div id="products" className="container">
            <Grid container spacing={10} style={{padding: 24}}>
              <Grid item xs={12} container justify="center" alignItems="center">
                <Paper
                  style={{
                    padding: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography>Filter Products By Catagory:</Typography>
                  <Select
                    style={{marginLeft: 12}}
                    value={this.state.filter}
                    onChange={this.handleChange}
                  >
                    {[
                      'All',
                      'Loose Leaf',
                      'Vacuum Packed',
                      'Paraphenalia',
                      'Edible',
                      'Other'
                    ].map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </Paper>
              </Grid>
              {this.props.products
                .filter(product => {
                  return (
                    this.state.filter === 'All' ||
                    product.catagory === this.state.filter
                  )
                })
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
