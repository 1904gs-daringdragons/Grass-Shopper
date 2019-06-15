import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from '@material-ui/core'
import {getOwnOrdersThunk, getAllOrdersThunk} from '../store/ordersList'

class ViewOrders extends React.Component {
  componentDidMount() {
    if (this.props.adminView && this.props.isAdmin) {
      this.props.getAllOrders()
    } else {
      const {userId} = this.props
      this.props.getOwnOrders(userId)
    }
  }
  render() {
    // console.log(this.props.orderList)
    const {adminView} = this.props
    return (
      <Container>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Order #</TableCell>
                {adminView ? <TableCell align="right">User</TableCell> : null}
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Date Placed</TableCell>
                <TableCell align="right">Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.orderList[0] ? (
                this.props.orderList.map(order => {
                  const upDate = new Date(order.updatedAt)
                  const createDate = new Date(order.createdAt)
                  return (
                    <TableRow key={order.id}>
                      <TableCell align="right">{order.id}</TableCell>
                      {adminView ? (
                        <TableCell align="right">{order.userId}</TableCell>
                      ) : null}
                      {adminView ? (
                        <TableCell align="right">{order.orderStatus}</TableCell>
                      ) : (
                        <TableCell align="right">{order.orderStatus}</TableCell>
                      )}
                      <TableCell align="right">{order.totalPrice}</TableCell>
                      <TableCell align="right">
                        {upDate.toLocaleString('default')}
                      </TableCell>
                      <TableCell align="right">
                        {createDate.toLocaleString('default')}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow />
              )}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    )
  }
}

const mapState = state => ({
  orderList: state.ordersList,
  isAdmin: state.user.isAdmin,
  userId: state.user.id
})

const mapDisptach = dispatch => {
  return {
    getOwnOrders(userId) {
      dispatch(getOwnOrdersThunk(userId))
    },
    getAllOrders() {
      dispatch(getAllOrdersThunk())
    }
  }
}

export default connect(mapState, mapDisptach)(ViewOrders)
