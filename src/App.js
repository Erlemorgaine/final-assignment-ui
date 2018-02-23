import React, { Component } from 'react'
import PropTypes from 'prop-types'
import muiTheme from './styles/theme'
import Navigation from './components/UI/Navigation'
import Routes from './routes'
import './App.css'

class App extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    return (
        <div className="App">
          {<Navigation />}
          <Routes />
        </div>
    )
  }
}

export default App
