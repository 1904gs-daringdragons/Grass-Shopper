import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, displayUserInfoName} from '../store/user'
import PropTypes from 'prop-types'
import {
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'

class AccountDetails extends Component {
  async componentDidMount() {
    await this.props.getUser()
  }
  render() {
    const {user, displayUserName} = this.props
    return user.id ? (
      <div className="accountDetails">
        <Paper>
          <div>
            <h2>Welcome, {displayUserName}</h2>

            <Grid container spacing={2}>
              <Link to="/orders">
                <Button variant="contained" color="secondary">
                  View Your Orders
                </Button>
              </Link>
              <Link to="/profile/update">
                <Button variant="contained" color="secondary">
                  Update Your Profile
                </Button>
              </Link>
              <Link to="profile/resetPassword">
                <Button variant="contained" color="secondary">
                  Reset Your Password
                </Button>
              </Link>
            </Grid>

            <Card>
              <CardContent>
                <Typography>
                  <h2>Account Details</h2>
                  <h3>First Name:</h3> {user.firstName}
                  <h3>Last Name:</h3> {user.lastName}
                  <h3>Email Address:</h3> {user.email}
                  <h3>Billing Address:</h3> {user.billingAddress}
                  <h3>City:</h3> {user.billingCity}
                  <h3>State:</h3> {user.billingState}
                  <h3>Zipcode:</h3> {user.billingZipcode}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Paper>
      </div>
    ) : (
      <div>
        <h3> Loading user details...</h3>
      </div>
    )
  }
}

const mapState = state => ({
  displayUserName: displayUserInfoName(state.user.firstName, state.user.email),
  user: state.user
})

const mapDispatch = () => ({
  getUser: me
})

export default connect(mapState, mapDispatch)(AccountDetails)

AccountDetails.propTypes = {
  displayUserName: PropTypes.string
}
