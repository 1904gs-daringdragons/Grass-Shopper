import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changePassword} from '../store/user'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      formerPassword: '',
      newPassword: ''
    }
  }

  componentDidMount = () => {
    this.setState({userId: this.props.userId})
  }

  handleChange = event => {
    console.log('handleChange was triggered')
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('handleSubmit was triggered')
    if (this.state.newPassword === this.state.confirmPassword) {
      console.log('the two new passwords input match')
      this.props.changePassword(
        this.state.userId,
        this.state.formerPassword,
        this.state.newPassword
      )
      this.props.history.push(`/home`)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <TextField
              required
              id="formerPassword"
              value={this.state.formerPassword}
              label="Current Password"
              type="password"
              name="formerPassword"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              id="newPassword"
              value={this.state.newPassword}
              label="New Password"
              type="password"
              name="newPassword"
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              id="confirmPassword"
              value={this.state.confirmPassword}
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              onChange={this.handleChange}
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

const mapStateToProps = state => ({userId: state.user.id})

const mapDispatchToProps = dispatch => ({
  changePassword: (userId, formerPassword, newPassword) =>
    dispatch(changePassword(userId, formerPassword, newPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
