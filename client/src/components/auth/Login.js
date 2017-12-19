import React, { Component } from 'react';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
    <div className="login">
      <h3>Login</h3>
      <form className="loginform" onSubmit={(e) => {this.props.handleLoginSubmit(e, this.state)}}>
        <input autoComplete="new-password" type="text" name="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
        <input autoComplete="new-password" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
        <input autoComplete="new-password" type="submit" value='Log In' />
      </form>
      <div id="switch-login" onClick={this.props.setAuthDisplay}>New user</div>
        {this.props.apiError ? <div className="api-error">{this.props.apiError}</div> : ''}
    </div>
    )
  }
}


export default Login;
