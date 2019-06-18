import React from 'react'
import {connect} from 'react-redux'
import {userListThunk} from '../store'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from '@material-ui/core'

class AllUsers extends React.Component {
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
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>User Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.userList[0] ? (
                this.props.userList.map(user => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
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

export default connect(mapState, mapDisptach)(AllUsers)
