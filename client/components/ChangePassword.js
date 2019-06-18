import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changePassword} from './store/user'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    const userId = this.props.user.id
    this.state = {
      userId,
      formerPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  componentDidMount = async () => {
    const user = await this.props.user
    const userId = user.id
    this.setState({userId})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.newPassword === this.state.confirmPassword) {
      await this.props.changePassword(
        this.state.userId,
        this.state.formerPassword,
        this.state.newPassword
      )
      this.props.history.push(`/accounts`)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <FormGroup>
            <TextField
              required
              id="formerPassword"
              // value={formerPassword}
              label="Current Password"
              type="text"
              name="formerPassword"
              onChange={this.props.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              id="newPassword"
              // value={newPassword}
              label="New Password"
              type="text"
              name="newPassword"
              onChange={this.props.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              id="confirmPassword"
              // value={confirmPassword}
              label="Confirm New Password"
              type="text"
              name="confirmPassword"
              onChange={this.props.handleChange}
              margin="normal"
              variant="outlined"
            />
          </FormGroup>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user})

const mapDispatchToProps = dispatch => ({
  changePassword: (user, formerPassword, newPassword) =>
    dispatch(changePassword(user, formerPassword, newPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
