import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'

export const UserForm = props => {
  const {firstName, lastName, email} = props.user
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <TextField
          required
          id="firstName"
          value={firstName}
          label="First Name"
          // className={classes.textField}
          type="text"
          name="firstName"
          onChange={props.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="lastName"
          value={lastName}
          label="Last Name"
          type="text"
          name="lastName"
          onChange={props.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="email"
          value={email}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          onChange={props.handleChange}
          margin="normal"
          variant="outlined"
        />
      </FormGroup>

      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </form>
  )
}

export default UserForm
