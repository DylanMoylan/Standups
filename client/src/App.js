import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './reset.css'
import './App.css'

//Import custom components
import Footer from './components/Footer'
import Header from './components/Header'
import Splash from './components/Splash'
import Dashboard from './components/Dashboard'
import Standup from './components/Standup'

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      user: null,
      apiError: null
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.logout = this.logout.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  handleLoginSubmit(e, data) {
    e.preventDefault()
    this.setState({
      apiError: null
    })
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        if(res.auth){
          this.setState({
            auth: res.auth,
            user: res.data.user
          })
        }else{
          this.setState({
            apiError: 'User not found'
          })
        }
      }).catch(err => console.log(err))
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault()
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        if(res.error) {
          if(res.error.code === 23505) {
            this.setState({
              apiError: 'Error: Username already exists'
            })
          }
        }else{
          this.setState({
            auth: res.auth,
            user: res.data.user
          })
        }
      }).catch(err => console.log(err))
  }

  logout() {
    fetch('/api/auth/logout', {
      credentials: 'include'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          auth: res.auth
        })
      }).catch(err => console.log(err))
  }

  deleteAccount() {
    let confirmDelete = window.prompt('Are you sure you want to delete this account? Type your email to confirm.')
    if(confirmDelete&& confirmDelete === this.state.user.email){
      fetch('/api/auth', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.json())
      .then(res => {
        this.setState({
          auth: res.auth,
          user: res.data.user
        })
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Header logout={this.logout} />
        <Route exact path="/" render={(props) => {
          return (
            this.state.auth ?
            <Redirect push to="/Dashboard" />
            : <Splash
                handleRegisterSubmit={this.handleRegisterSubmit}
                handleLoginSubmit={this.handleLoginSubmit}
                auth={this.state.auth}
                user={this.state.user}
                apiError={this.state.apiError}
              />
          )
        }}
        />
        <Route exact path="/Dashboard" render={(props) => {
          return (
            this.state.auth ?
            <Dashboard
              user={this.state.user}
            />
            : <Redirect push to="/" />
          )
          }}
        />
        <Route exact path="/Standup" render={(props) => {
          return (
            this.state.auth ?
            <Standup />
            : <Redirect push to="/" />
          )
          }}
        />
        <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
