import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changePassword} from '../store/user'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    const user = this.props.user
    this.state = {
      user,
      formerPassword: '',
      newPassword: ''
    }
  }

  componentDidMount = async () => {
    const user = await this.props.user
    // const userId = user.id
    this.setState({...user})
  }

  handleChange = event => {
    console.log('handleChange was triggered')
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log('handleSubmit was triggered')
    if (this.state.newPassword === this.state.confirmPassword) {
      console.log('the two new passwords input match')
      await this.props.changePassword(
        this.state.user,
        this.state.formerPassword,
        this.state.newPassword
      )
      this.props.history.push(`/accounts`)
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
              // value={formerPassword}
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
              // value={newPassword}
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
              // value={confirmPassword}
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

const mapStateToProps = state => ({user: state.user})

const mapDispatchToProps = dispatch => ({
  changePassword: (user, formerPassword, newPassword) =>
    dispatch(changePassword(user, formerPassword, newPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
