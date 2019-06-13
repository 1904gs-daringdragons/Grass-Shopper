import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'

const greenTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#388E3C'
    },
    secondary: {
      main: '#8bc34a'
    },
    type: 'dark'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={greenTheme}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
