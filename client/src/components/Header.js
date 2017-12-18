import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

function Dropdown(props) {
  return (
    <div className={ props.toggled ? 'header-dropdown' : 'nodisplay header-dropdown' }>
      <ul>
        <li onClick={() => {
          props.toggleDropdown()
          props.deleteAccount()
        }}>Delete Account</li>
        <li onClick={() => {
          props.toggleDropdown()
          props.logout()
        }}>Logout</li>
      </ul>
    </div>
  )
}

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      dropDown: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown() {
    this.setState({
      dropDown: !this.state.dropDown
    })
  }

  render() {
    return (
      <header>
        <Link to="/"><div className="logo">Home</div></Link>
        <FontAwesome name="bars" onClick={this.toggleDropdown}/>
        <Dropdown
          toggleDropdown={this.toggleDropdown}
          logout={this.props.logout}
          toggled={this.state.dropDown}
          deleteAccount={this.props.deleteAccount}
        />
      </header>
    )
  }
}

export default Header

