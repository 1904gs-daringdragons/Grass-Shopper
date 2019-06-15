import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  ViewAllUsers
} from './components'
import {me, getCartThunk} from './store'
import AccountDetails from './components/account-details'
import UpdateUser from './components/updateUser'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const accountDetailPath = isLoggedIn ? (
      <Route exact path="/:userId/accountdetails" component={AccountDetails} />
    ) : null

    this.props.loadCart(this.props.uid)
    return (
      <Switch>
        <Route path="/products/:pId" component={SingleProduct} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/cart" component={Cart} />

        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/accounts" component={AccountDetails} />
        <Route path="/profile/update" component={UpdateUser} />
        <Route exact path="/admin/allusers" component={ViewAllUsers} />

        {accountDetailPath}
        <Route component={Products} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    uid: state.user.id
    // user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadCart(uid) {
      dispatch(getCartThunk(uid))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
  // isLoggedIn: PropTypes.bool.isRequired
}
