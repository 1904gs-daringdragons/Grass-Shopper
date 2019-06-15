import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, displayUserInfoName} from '../store/user'
import PropTypes from 'prop-types'
import {Button, Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'

class AccountDetails extends Component {
  async componentDidMount() {
    await this.props.getUser()
  }
  render() {
    const {user, displayUserName} = this.props
    return user.id ? (
      <div className="center">
        <h2>Welcome, {displayUserName}</h2>
        <Grid container spacing={2}>
          <Link to="/profile/orders">
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

// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {displayUserInfoName} from '../store/user'
// // import AdminHome from './AdminHome'
// import {Link} from 'react-router-dom'
// import {Button, ButtonToolbar} from '@material-ui/core'
// // import DisplayPastOrders from './DisplayPastOrders'

// /**
//  * COMPONENT
//  */
// export const AccountDetails = props => {
//   const {displayName} = props

//   return (
//     <div>
//       <br />
//       <h4>Welcome, {displayName}</h4>
//       {/* <ButtonToolbar> */}
//         <Link to="/profile/orders">
//           <Button variant="secondary" className="home-page-btn">
//             View Your Orders
//           </Button>
//         </Link>

//         <Link to="profile/update">
//           <Button variant="secondary" className="home-page-btn">
//             Update Your Profile Information
//           </Button>
//         </Link>

//         <Link to="profile/resetPassword">
//           <Button variant="secondary" className="home-page-btn">
//             Reset Your Password
//           </Button>
//         </Link>
//       {/* </ButtonToolbar> */}
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     displayName: displayUserInfoName(state.user.firstName, state.user.email),
//     user: state.user
//   }
// }

// export default connect(mapState)(AccountDetails)

// /**
//  * PROP TYPES
//  */
// AccountDetails.propTypes = {
//   displayName: PropTypes.string
// }
