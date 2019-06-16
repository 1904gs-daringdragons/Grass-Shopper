/* eslint-disable */
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    console.log('There was a fuckup somwhere :', error, '\n\n', info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>THERE WAS A FUCKUP SOMEWHERE CHECK THE CONSOLE</h1>
    }

    return this.props.children
  }
}

export {ErrorBoundary}
