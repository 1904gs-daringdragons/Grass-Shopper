import React from 'react'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {PayPalButton} from 'react-paypal-button-v2'

import {
  changeQuantityThunk as changeQuantity,
  removeProductThunk as removeProduct,
  submitOrderThunk
} from '../store/cart'

const TAX_RATE = 0.07

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

function ccyFormat(num) {
  return `${num.toFixed(2)}`
}

function priceRow(qty, unit) {
  return qty * unit
}

function subtotal(items) {
  return items
    .map(({price, quantity}) => price / 100 * quantity)
    .reduce((sum, i) => sum + i, 0)
}

function SpanningTable(props) {
  const classes = useStyles()

  function handlePayment(orderId, payerDetails, purchaseDetails) {
    const newOrder = {
      recipientName:
        payerDetails.name.given_name + ' ' + payerDetails.name.surname,
      confirmationEmail: payerDetails.email_address,
      price: purchaseDetails.amount.value,
      userId: props.userId,
      shippingAddress:
        purchaseDetails.shipping.address.address_line_1 +
        ' ' +
        purchaseDetails.shipping.address.address_line_2,
      shippingCity: purchaseDetails.shipping.address.admin_area_2,
      shippingState: purchaseDetails.shipping.address.admin_area_1,
      shippingZipcode: purchaseDetails.shipping.address.postal_code,
      payPalConfirmationNumber: orderId,
      cart: props.cart
    }
    props.submitOrder(newOrder)
    props.history.push('./home')
  }

  if (
    Object.keys(props.cart).length !== 0 &&
    props.cart.constructor === Object
  ) {
    const invoiceSubtotal = subtotal(Object.values(props.cart))
    const invoiceTaxes = TAX_RATE * invoiceSubtotal
    const invoiceTotal = invoiceTaxes + invoiceSubtotal
    const handleChange = event => {
      props.changeQty(props.userId, +event.target.id, +event.target.value)
    }

    return (
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell />
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(props.cart).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        className={classes.button}
                        onClick={() =>
                          props.removeProduct(props.userId, row.id)
                        }
                      >
                        Remove
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        id={`${row.id}`}
                        type="number"
                        margin="normal"
                        defaultValue={`${row.quantity}`}
                        inputProps={{min: '1', step: '1'}}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="right">{row.price / 100}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(priceRow(row.quantity, row.price / 100))}
                    </TableCell>
                  </TableRow>
                )
              })}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Grid container alignItems="flex-end" justify="flex-end">
            <PayPalButton
              amount={ccyFormat(invoiceTotal)}
              onSuccess={(details, data) => {
                handlePayment(
                  details.id,
                  details.payer,
                  details.purchase_units[0]
                )
                return fetch('/paypal-transaction-complete', {
                  method: 'post',
                  body: JSON.stringify({
                    orderId: data.orderID
                  })
                })
              }}
              options={{
                clientId:
                  'AUlK0-pQQmL4OI4BcmcjjlQ9TOX8QtG0aS4MmsX0m988VaZdAOPldGFYSjyerJgAKr0mzjTYfr2gFfkT'
              }}
            />
          </Grid>
        </Paper>
      </Container>
    )
  } else {
    return <div>Loading...</div>
  }
}

const mapToState = state => ({
  cart: state.cart,
  userId: state.user.id || 0
})

const mapDispatchToProps = dispatch => {
  return {
    changeQty: (userId, productId, qty) =>
      dispatch(changeQuantity(userId, productId, qty)),
    removeProduct: (userId, productId) =>
      dispatch(removeProduct(userId, productId)),
    submitOrder: order => dispatch(submitOrderThunk(order))
  }
}

export default connect(mapToState, mapDispatchToProps)(SpanningTable)
