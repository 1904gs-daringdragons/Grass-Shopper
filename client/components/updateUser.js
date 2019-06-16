import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserForm from './userForm'
import {editUserInfo} from '../store/user'

export class UpdateUser extends Component {
  constructor(props) {
    super(props)
    const {id, firstName, lastName, email} = this.props
    this.state = {
      id,
      firstName,
      lastName,
      email
    }
  }

  componentDidMount = async () => {
    const {id, firstName, lastName, email} = await this.props.user

    const user = {
      id,
      firstName,
      lastName,
      email
    }
    this.setState({...user})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.editUserInfo(this.state)
    this.props.history.push(`/accounts`)
  }

  render() {
    return (
      <div>
        <h3>Update Your Profile</h3>
        <UserForm
          user={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  editUserInfo: user => dispatch(editUserInfo(user))
})

export default connect(mapState, mapDispatch)(UpdateUser)
