import React, { Component } from 'react';


class Register extends Component {
    constructor() {
      super();
      this.state = {
       email: '',
       name: '',
       password: ''
    };
   this.handleInputChange = this.handleInputChange.bind(this)
}

handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value,
    });
}

render() {
    return (
       <div className="login">
            <form className="loginform" onSubmit={(e) => {this.props.handleRegisterSubmit(e, this.state)}}>
                <input type="text" name="name" value={this.state.name} placeholder="Full name" onChange={this.handleInputChange} />
                <input type="text" name="email" value={this.state.email} placeholder="Email Address" onChange={this.handleInputChange} />
                <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                <input type="submit" value="Register" />
            </form>
            <div id="switch-login" onClick={this.props.setAuthDisplay}>Already have an account?</div>
            {this.props.apiError ? <div className="error-handler">{this.props.apiError}</div> : ''}
        </div>
            )
        }
}


export default Register;
