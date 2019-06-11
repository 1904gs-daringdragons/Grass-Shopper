import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'

const ProductCard = props => {
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
        <Typography gutterBottom variant="h4" component="h2">
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
        {/* <Button
					size="small"
					color="primary"
					// onClick={() => props.addToCart(props.product.id)}
					variant="contained"
				>
					Delete
				</Button> */}
      </CardActions>
    </Card>
  )
}

export default ProductCard
