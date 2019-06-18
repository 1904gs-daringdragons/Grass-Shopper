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
      <CardContent
        style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {props.product.name}
        </Typography>
        <Typography component="p">$ {props.product.price / 100}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCart(props.product.id, 1, props.userId)}
          variant="contained"
          style={{alignSelf: 'flex-end'}}
        >
          Add to Cart
        </Button>
      </CardContent>
      {/* <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
				<TextField
					label="Quantity"
					id={`qty-${props.product.id}`}
					type="number"
					margin="normal"
					defaultValue="1"
					inputProps={{ min: '1', step: '1' }}
				/>

			</CardActions> */}
    </Card>
  )
}

export default ProductCard
