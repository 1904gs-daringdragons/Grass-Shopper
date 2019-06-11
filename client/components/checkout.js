import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store'
import TextFeild from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'

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
      reciepientName,
      confirmationEmail,
      price,
      address,
      city,
      state,
      zipcode,
      userId
    }
  }

  changeHandler(e) {
    const feildName = e.target.id
    const newVal = e.target.value
    const message = {}
    message[feildName] = newVal
    this.setState(message)
  }

  render() {
    const classes = useStyles()
    if (props.isLoggedIn) {
      this.setState({recipientName: props.user.firstName})
      this.setState({confirmationEmail: props.user.email})
      this.setState({userId: props.user.id})
      const beforeTax = invoiceSubtotal
      const tax = invoiceTaxes
      const price = invoiceTotal
      this.setState({price})
      return (
        <Container maxWidth="md">
          <Paper>
            <Grid container alignItems="flex-end" justify="flex-end">
              <form className={classes.container} autoComplete="on">
                <TextFeild
                  id="address"
                  label="Address"
                  className={classes.textFeild}
                  value={this.state.address}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="city"
                  label="City"
                  className={classes.textFeild}
                  value={this.state.city}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="state"
                  label="State"
                  className={classes.textFeild}
                  value={this.state.state}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="zipcode"
                  label="Zipcode"
                  className={classes.textFeild}
                  value={this.state.zipcode}
                  margin="normal"
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  type="submit"
                >
                  Submit Order
                </Button>
              </form>
            </Grid>
          </Paper>
        </Container>
      )
    } else {
      const beforeTax = invoiceSubtotal
      const tax = invoiceTaxes
      const price = invoiceTotal
      this.setState({price})
      return (
        <Container maxWidth="md">
          <Paper>
            <Grid container alignItems="flex-end" justify="flex-end">
              <form className={classes.container} autoComplete="on">
                <Grid item />
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  value={this.state.confirmationEmail}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="reciepientName"
                  label="Name"
                  className={classes.textFeild}
                  value={this.state.reciepientName}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="address"
                  label="Address"
                  className={classes.textFeild}
                  value={this.state.address}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="city"
                  label="City"
                  className={classes.textFeild}
                  value={this.state.city}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="state"
                  label="State"
                  className={classes.textFeild}
                  value={this.state.state}
                  margin="normal"
                  variant="outlined"
                />
                <TextFeild
                  id="zipcode"
                  label="Zipcode"
                  className={classes.textFeild}
                  value={this.state.zipcode}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  type="submit"
                >
                  Submit Order
                </Button>
              </form>
            </Grid>
          </Paper>
        </Container>
      )
    }
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
