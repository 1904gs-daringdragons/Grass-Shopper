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
  TableRow,
  Select,
  MenuItem
} from '@material-ui/core'
import {editUserAdminStatus} from '../store'
import {Redirect} from 'react-router-dom'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getUserList()
  }

  handleChange(event) {
    const {name, value} = event.target
    this.props.updateUser(name, value)
  }

  render() {
    if (!this.props.isAdmin) return <Redirect to="/home" />

    return (
      <Container>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">User Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.userList[0] ? (
                this.props.userList.map(user => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.firstName}</TableCell>
                      <TableCell align="left">{user.lastName}</TableCell>
                      <TableCell align="center">
                        {this.props.userId === user.id ? (
                          'Admin'
                        ) : (
                          <Select
                            value={user.isAdmin}
                            onChange={this.handleChange}
                            inputProps={{
                              name: `${user.id}`,
                              id: user.id
                            }}
                          >
                            <MenuItem value={true}>Admin</MenuItem>
                            <MenuItem value={false}>User</MenuItem>
                          </Select>
                        )}
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
  userList: state.userList,
  isAdmin: state.user.isAdmin,
  userId: state.user.id
})

const mapDisptach = dispatch => {
  return {
    getUserList() {
      dispatch(userListThunk())
    },
    updateUser(id, status) {
      dispatch(editUserAdminStatus(id, status))
    }
  }
}

export default connect(mapState, mapDisptach)(AllUsers)
