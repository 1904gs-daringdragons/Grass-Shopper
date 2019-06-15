/* eslint-disable react/require-render-return */
import React from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout-components'

let PayPalButton = paypal.Buttons.driver('react', {React, ReactDOM})
class Main extends React.Component {
  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '0.01'
          }
        }
      ]
    })
  }
  onApprove(data, actions) {
    return actions.order.capture()
  }
  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
      />
    )
  }
}
ReactDOM.render(<Main />, document.querySelector('#page'))
