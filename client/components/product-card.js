import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import {TextField} from '@material-ui/core'

const ProductCard = props => {
  const {addToCart} = props
  return (
    <Card>
      <Link to={`/products/${props.product.id}`}>
        <CardMedia
          style={{height: 0, paddingTop: '56.25%'}}
          image={props.product.imageUrl}
          title={props.product.name}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.product.name}
        </Typography>
        <Typography component="p">{props.product.description}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/products/${props.product.id}`}>
          <Button size="small" color="primary" variant="contained">
            Product Details
          </Button>
        </Link>
        <Button
          size="small"
          color="primary"
          onClick={() =>
            addToCart(
              props.product.id,
              +document.getElementById(`qty-${props.product.id}`).value,
              props.userId
            )
          }
          variant="contained"
        >
          Add to Cart
        </Button>
        <TextField
          label="Quantity"
          id={`qty-${props.product.id}`}
          type="number"
          margin="normal"
          defaultValue="1"
          inputProps={{min: '1', step: '1'}}
        />
      </CardActions>
    </Card>
  )
}

export default ProductCard
