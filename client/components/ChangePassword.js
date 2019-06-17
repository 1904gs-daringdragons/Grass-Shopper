import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changePassword} from './store/user'

class ChangePassword extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div />
  }
}

const mapStateToProps = state => ({user: state.user})

const mapDispatchToProps = dispatch => ({
  changePassword: (user, formerPassword, newPassword) =>
    dispatch(changePassword(user, formerPassword, newPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
