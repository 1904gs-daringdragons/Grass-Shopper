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

class ViewOrdersAdmin extends React.Component {
  componentDidMount() {
    this.props.getUserList()
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
              {this.props.userList[0] ? (
                this.props.userList.map(user => {
                  return (
                    <TableRow>
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
  userList: state.userList
})

const mapDisptach = dispatch => {
  return {
    getUserList() {
      dispatch(userListThunk())
    }
  }
}

export default connect(mapState, mapDisptach)(ViewOrdersAdmin)
