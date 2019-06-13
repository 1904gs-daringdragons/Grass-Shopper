import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'

class AccountDetails extends Component {
  async componentDidMount() {
    await this.props.getUser()
  }

  render() {
    const {user} = this.props
    return user.id ? (
      <div className="center">
        <br />
        <h1>Account Details</h1>
        <br />
        <h3>FirstName:</h3> <p> {user.firstName}</p>
        <h3>LastName:</h3> <p> {user.lastName}</p>
        <h3>Email Address:</h3> <p> {user.email}</p>
        <h3>Address:</h3> <p> {user.address}</p>
        <h3>City:</h3> <p> {user.city}</p>
        <h3>State:</h3> <p> {user.state}</p>
        <h3>Zipcode:</h3> <p> {user.zipcode}</p>
      </div>
    ) : (
      <div>Loading user details...</div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = () => ({
  getUser: me
})

export default connect(mapState, mapDispatch)(AccountDetails)
