import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store'
import TextFeild from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

// const dummyCart = [
//   {name: 'weed1', price: 200, qty: 1},
//   {name: 'weed2', price: 300, qty: 2},
//   {name: 'weed3', price: 400, qty: 3},
//   {name: 'weed4', price: 500, qty: 4}
// ]

function subtotal(items) {
  return items
    .map(({price, quantity}) => price * quantity)
    .reduce((sum, i) => sum + i, 0)
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
// const TAX_RATE = 0.07

class checkoutMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipientName: '',
      confirmationEmail: '',
      price: 0,
      userId: 0,
      address: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }

  componentDidMount() {
    const invoiceSubtotal = subtotal(Object.values(this.props.cart))
    const TAX_RATE = 0.07
    console.log(this.props.cart)
    const invoiceTaxes = TAX_RATE * invoiceSubtotal
    const invoiceTotal = invoiceTaxes + invoiceSubtotal
    this.setState({price: invoiceTotal})
  }

  changeHandler(e) {
    const mssg = {}
    const {value, id} = e.target
    mssg[id] = value
    this.setState(mssg)
  }

  clickHandler() {
    this.props.handleClick(this.state)
    this.props.history.push('./home')
  }

  render() {
    let formCompleted = false

    return (
      <Container maxWidth="md">
        <Paper>
          {invoiceTotal}
          {this.props.isLoggedIn ? (
            ''
          ) : (
            <Grid container justify="center" spacing={3}>
              <Grid item xs={6}>
                <TextFeild
                  required
                  id="recipientName"
                  value={this.state.recipientName}
                  label="Name"
                  variant="outlined"
                  onChange={e => this.changeHandler(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFeild
                  required
                  id="confirmationEmail"
                  value={this.state.confirmationEmail}
                  label="Email"
                  variant="outlined"
                  onChange={e => this.changeHandler(e)}
                />
              </Grid>
            </Grid>
          )}
          <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
              <TextFeild
                required
                id="address"
                value={this.state.address}
                label="Address"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFeild
                required
                id="city"
                value={this.state.city}
                label="City"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFeild
                required
                id="state"
                value={this.state.state}
                label="State"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFeild
                required
                id="zipcode"
                value={this.state.zipcode}
                label="Zipcode"
                variant="outlined"
                onChange={e => this.changeHandler(e)}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={() => this.clickHandler()}
            disabled={!formCompleted}
            // {formCompleted ? '' : disabled}
          >
            Submit Order
          </Button>
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
