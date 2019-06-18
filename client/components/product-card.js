import React from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'
import {updateRatingThunk} from '../store/product'

const ProductCard = props => {
  const {addToCart} = props

  const handleStarClick = nextValue => {
    console.log('im here')
    props.updateRec(props.product.id, props.userId, nextValue)
  }
  return (
    <Card>
      <Link to={`/products/${props.product.id}`}>
        <CardMedia
          style={{height: 0, paddingTop: '56.25%'}}
          image={props.product.imageUrl}
          title={props.product.name}
        />
      </Link>
      <CardContent
        style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {props.product.name}
        </Typography>

        <Typography
          component="p"
          style={{display: 'flex', justifyContent: 'space-between'}}
        >
          $ {props.product.price / 100}
          <Button
            size="small"
            color="primary"
            onClick={() => addToCart(props.product.id, 1, props.userId)}
            variant="contained"
            style={{alignSelf: 'flex-end'}}
          >
            Add to Cart
          </Button>
        </Typography>

        <StarRatingComponent
          name={props.product.stars + '-stars'}
          value={props.product.stars}
          style={{alignSelf: 'flex-end', width: '50%'}}
          editing={!!props.userId}
          onStarClick={handleStarClick}
        />
      </CardContent>
    </Card>
  )
}

const mapDispatch = dispatch => ({
  updateRec: (pId, uId, stars) => {
    dispatch(updateRatingThunk(pId, uId, stars))
  }
})

export default connect(null, mapDispatch)(ProductCard)
