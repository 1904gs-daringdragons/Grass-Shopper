import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  Fab
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Delete'
import {getOwnOrdersThunk, getAllOrdersThunk, updateOrderThunk} from '../store'

class ViewOrders extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    if (this.props.adminView && this.props.isAdmin) {
      this.props.getAllOrders()
    } else {
      const {userId} = this.props
      this.props.getOwnOrders(userId)
    }
  }

  handleChange(event) {
    const {name, value} = event.target
    this.props.updateOrder(name, value)
  }

  handleDelete(id) {
    this.props.updateOrder(id, 'CANCELLED')
  }
  render() {
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
                <TableCell align="right">Cancel Order</TableCell>
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
                      {adminView &&
                      order.orderStatus &&
                      order.orderStatus !== 'CANCELLED' &&
                      order.orderStatus !== 'CART' ? (
                        <TableCell align="right">
                          <Select
                            value={order.orderStatus}
                            onChange={this.handleChange}
                            inputProps={{
                              name: `${order.id}`,
                              id: order.id
                            }}
                          >
                            <MenuItem value="CREATED">CREATED</MenuItem>
                            <MenuItem value="PROCESSING">PROCESSING</MenuItem>
                            <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                          </Select>
                        </TableCell>
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
                      <TableCell>
                        <Fab
                          onClick={() => this.handleDelete(order.id)}
                          size="small"
                        >
                          X
                        </Fab>
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
    },
    updateOrder(orderId, orderStatus) {
      dispatch(updateOrderThunk(orderId, orderStatus))
    }
  }
}

export default connect(mapState, mapDisptach)(ViewOrders)
