import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store'
import TextFeild from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const dummyCart = [
  {name: 'weed1', price: 200, qty: 1},
  {name: 'weed2', price: 300, qty: 2},
  {name: 'weed3', price: 400, qty: 3},
  {name: 'weed4', price: 500, qty: 4}
]

function subtotal(items) {
  return items.map(({price, qty}) => price * qty).reduce((sum, i) => sum + i, 0)
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}))

const invoiceSubtotal = subtotal(dummyCart)
const invoiceTaxes = TAX_RATE * invoiceSubtotal
const invoiceTotal = invoiceTaxes + invoiceSubtotal

const TAX_RATE = 0.07

class checkoutMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }

  changeHandler(e) {
    const mssg = {}
    const val = e.target.value
    mssg[e.target.id] = val
    this.setState({input: val})
  }

  render() {
    return (
      <Container maxWidth="md">
        <Paper>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
              <TextFeild
                id="address"
                value={this.state.input}
                label="Address"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFeild
                id="city"
                value={this.state.input}
                label="City"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFeild
                id="state"
                value={this.state.input}
                label="State"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFeild
                id="zipcode"
                value={this.state.input}
                label="Zipcode"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
          </Grid>
          <Button>Submit Order</Button>
        </Paper>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(order) {
      dispatch(submitOrderThunk(order))
    }
  }
}

export default connect(mapState, mapDispatch)(checkoutMenu)
