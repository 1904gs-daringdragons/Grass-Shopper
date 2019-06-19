import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/cart'
import {getOneProductThunk, updateRatingThunk} from '../store/product'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {TextField} from '@material-ui/core'
import StarRatingComponent from 'react-star-rating-component'

class SingleProduct extends Component {
  componentDidMount() {
    const {pId} = this.props.match.params
    this.props.getOneProduct(pId)
    this.handleStarClick = this.handleStarClick.bind(this)
  }
  handleStarClick = nextValue => {
    const {pId} = this.props.match.params
    this.props.updateRec(pId, this.props.user.id, nextValue)
    this.forceUpdate()
  }

  render() {
    return (
      <div style={{marginTop: '7%', display: 'flex', justifyContent: 'center'}}>
        <Card className="SinglePage">
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={this.props.product.imageUrl}
            title={this.props.product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {this.props.product.name}
            </Typography>
            <Typography variant="h5" component="h5">
              $ {this.props.product.price / 100}
            </Typography>
            <Typography component="p">
              {this.props.product.description}
            </Typography>
          </CardContent>
          <CardActions className="quantity">
            <TextField
              label="Quantity"
              id={`qty-${this.props.product.id}`}
              type="number"
              margin="normal"
              defaultValue="1"
              inputProps={{min: '1', step: '1'}}
            />
            <Button
              size="small"
              color="primary"
              onClick={() =>
                this.props.addToCart(
                  this.props.product.id,
                  +document.getElementById(`qty-${this.props.product.id}`).value
                )
              }
              variant="contained"
            >
              Add to Cart
            </Button>
            <StarRatingComponent
              name={this.props.product.stars + '-stars'}
              value={this.props.product.stars || 0}
              style={{alignSelf: 'flex-end', width: '50%'}}
              editing={!!this.props.user.id}
              onStarClick={this.handleStarClick}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.products.selectedProduct,
  user: state.user
})

const mapDisp = dispatch => ({
  getOneProduct: pId => dispatch(getOneProductThunk(pId)),
  addToCart: (id, qty) => dispatch(addProductThunk(id, qty)),
  updateRec: (pId, uId, stars) => {
    dispatch(updateRatingThunk(pId, uId, stars))
  }
})

export default connect(mapState, mapDisp)(SingleProduct)
