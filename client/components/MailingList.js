import React from 'react'
// import ReactDOM from 'react-dom'

export default class MailingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  onChange(e) {
    var email = e.target.value
    this.setState({email})
  }

  render() {
    return (
      <div>
        <div>
          <form
            action="https://bestdev.us20.list-manage.com/subscribe/post?u=7521574872d7866bcaed65b75&amp;id=66dd997910"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div>
              <label htmlFor="mce-EMAIL" className="subHeader">
                <h3>Subscribe to our mailing list to receive up to 20% OFF!</h3>
              </label>
              <br />
              <div>
                <input
                  type="input"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  required
                />
                <p />

                <input
                  type="input"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
                <p />
                <input
                  type="input"
                  value={this.state.email}
                  onChange={this.onChange}
                  name="EMAIL"
                  className="email"
                  id="mce-EMAIL"
                  placeholder="email address"
                  required
                />
              </div>
              <p />
              <div className="clear">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
