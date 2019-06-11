import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ProductCard from './product-card'
// import AddCampus from './AddCampus';

class DisconnectedProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    // this.handleClose = this.handleClose.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
  }
  componentDidMount() {
    console.log('mounting')
    this.props.getAllProducts()
  }
  // handleOpen() {
  // 	this.setState({ open: true });
  // }

  // handleClose() {
  // 	this.setState({ open: false });
  // }
  render() {
    if (this.props.products[0]) {
      console.log(this.props)
      return (
        <div>
          {/* <Button
						onClick={this.handleOpen}
						style={{ marginTop: 24, marginLeft: 24 }}
						size="large"
						color="primary"
						variant="contained"
					>
						+ Add to Cart
					</Button> */}
          <div id="products" className="container">
            <Grid container spacing={10} style={{padding: 24}}>
              {this.props.products.map(product => {
                return (
                  <Grid key={product.id} item xs={12} sm={6} lg={4} xl={3}>
                    {<ProductCard product={product} />}
                  </Grid>
                )
              })}
            </Grid>
          </div>
          {/* <div>
						<AddCampus
							products={this.props.products}
							handleClose={this.handleClose}
							open={this.state.open}
							addNewCampus={this.props.addNewCampus}
						/>
					</div> */}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(getProductsThunk())
})

export default connect(mapState, mapDispatch)(DisconnectedProductList)
