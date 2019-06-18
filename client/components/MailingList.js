import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const url =
  '//bestdev.us20.list-manage.com/subscribe/post?u=7521574872d7866bcaed65b75&amp;id=66dd997910'

// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url} />

// use the render prop and your custom form
const MailingList = () => (
  <div>
    <h2>Please subscribe to our mailing list to get up to 20% OFF!</h2>
    <MailchimpSubscribe
      url={url}
      render={({subscribe, status, message}) => (
        <div className="maillist">
          <SimpleForm onSubmitted={formData => subscribe(formData)} />
          {status === 'sending' && (
            <div style={{color: 'blue'}}>sending...</div>
          )}
          {status === 'error' && (
            <div
              style={{color: 'red'}}
              dangerouslySetInnerHTML={{__html: message}}
            />
          )}
          {status === 'success' && (
            <div style={{color: 'green'}}>Subscribed !</div>
          )}
        </div>
      )}
    />
  </div>
)

export default MailingList
