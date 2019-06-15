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

class ViewOrdersAdmin extends React.Component {
  componentDidMount() {
    this.props.getOrderList()
  }
  render() {
    return (
      <Container>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">User Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.orderList[0] ? (
                this.props.orderList.map(order => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.firstName}</TableCell>
                      <TableCell align="right">{user.lastName}</TableCell>
                      <TableCell align="right">
                        {user.isAdmin ? 'Admin' : 'User'}
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
  orderList: state.ordersList
})

const mapDisptach = dispatch => {
  return {
    getOwnOrders() {
      dispatch(getOwnOrdersThunk())
    },
    getAllOrders() {
      dispatch(getAllOrdersThunk())
    }
  }
}

export default connect(mapState, mapDisptach)(ViewOrdersAdmin)
