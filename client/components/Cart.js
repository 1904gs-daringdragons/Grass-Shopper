import React from 'react'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import {addProductOrChangeQty} from '../store/cart'

const dummyCart = [
  {name: 'weed1', price: 200, qty: 1},
  {name: 'weed2', price: 300, qty: 2},
  {name: 'weed3', price: 400, qty: 3},
  {name: 'weed4', price: 500, qty: 4}
]
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

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit)
  return {desc, qty, unit, price}
}

function subtotal(items) {
  return items.map(({price, qty}) => price * qty).reduce((sum, i) => sum + i, 0)
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99)
]

const invoiceSubtotal = subtotal(rows)
const invoiceTaxes = TAX_RATE * invoiceSubtotal
const invoiceTotal = invoiceTaxes + invoiceSubtotal

function SpanningTable(props) {
  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyCart.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  {ccyFormat(priceRow(row.qty, row.price))}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
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
          <Button
            m={2}
            variant="contained"
            className={classes.button}
            color="primary"
          >
            Check Out
          </Button>
        </Grid>
      </Paper>
    </Container>
  )
}

const mapToState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => {
  return {
    changeQty: (productId, qty) =>
      dispatch(addProductOrChangeQty(productId, qty))
  }
}

export default connect(mapToState, mapDispatchToProps)(SpanningTable)
