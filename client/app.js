import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'
import {ErrorBoundary} from './ErrorBoundary'

const greenTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#388E3C'
    },
    secondary: {
      main: '#8bc34a'
    },
    type: 'dark'
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color'
        }
      }
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={greenTheme}>
      <ErrorBoundary>
        <div>
          <Navbar />
          <Routes />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
