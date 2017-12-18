import React from 'react';
import Login from './auth/Login'
import Register from './auth/Register'
import AppInfo from './AppInfo'
class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authDisplay:false
    }
    this.setAuthDisplay = this.setAuthDisplay.bind(this)
  }
  setAuthDisplay(){
    this.setState({
      authDisplay:!this.state.authDisplay
    })
  }

  render() {
    return (
      <div className="main">
        <div className="hero">
        {this.state.authDisplay ?
          <Register
            handleRegisterSubmit={this.props.handleRegisterSubmit}
            setAuthDisplay={this.setAuthDisplay}
            apiError={this.props.apiError}
          /> :
          <Login
            handleLoginSubmit={this.props.handleLoginSubmit}
            setAuthDisplay={this.setAuthDisplay}
            apiError={this.props.apiError}
          />
        }
        </div>
        <AppInfo />
      </div>
    )
  }
}

export default Splash
