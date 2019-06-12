import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

function subtotal(items) {
  return items
    .map(({price, quantity}) => price * quantity)
    .reduce((sum, i) => sum + i, 0)
}

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
    this.invoiceTaxes = TAX_RATE * invoiceSubtotal
    this.invoiceTotal = this.invoiceTaxes + invoiceSubtotal
    this.setState({price: this.invoiceTotal})
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
    return (
      <Container maxWidth="md">
        <ValidatorForm onSubmit={() => this.clickHandler()}>
          <Paper>
            {this.invoiceTotal || 0}
            {this.props.isLoggedIn ? (
              ''
            ) : (
              <Grid container justify="center" spacing={3}>
                <Grid item xs={6}>
                  <TextValidator
                    required
                    id="recipientName"
                    value={this.state.recipientName}
                    label="Name"
                    variant="outlined"
                    onChange={e => this.changeHandler(e)}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    // required
                    id="confirmationEmail"
                    value={this.state.confirmationEmail}
                    label="Email"
                    variant="outlined"
                    onChange={e => this.changeHandler(e)}
                    validators={['required', 'isEmail']}
                    errorMessages={[
                      'this field is required',
                      'email is not valid'
                    ]}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container justify="center" spacing={3}>
              <Grid item xs={6}>
                <TextValidator
                  required
                  id="address"
                  value={this.state.address}
                  label="Address"
                  variant="outlined"
                  onChange={e => this.changeHandler(e)}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  required
                  id="city"
                  value={this.state.city}
                  label="City"
                  variant="outlined"
                  onChange={e => this.changeHandler(e)}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  required
                  id="state"
                  value={this.state.state}
                  label="State"
                  variant="outlined"
                  onChange={e => this.changeHandler(e)}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  required
                  id="zipcode"
                  value={this.state.zipcode}
                  label="Zipcode"
                  variant="outlined"
                  onChange={e => this.changeHandler(e)}
                  validators={[
                    'required',
                    'matchRegexp:^[0-9]{5}(?:-[0-9]{4})?$'
                  ]}
                  errorMessages={[
                    'this field is required',
                    'Must be valid Zipcode'
                  ]}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              // onClick={() => this.clickHandler()}
              // disabled={!formCompleted}
              // {formCompleted ? '' : disabled}
            >
              Submit Order
            </Button>
          </Paper>
        </ValidatorForm>
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
