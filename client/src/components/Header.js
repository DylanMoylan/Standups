import React from 'react'
// <li onClick={() => {
//           props.deleteAccount()
//         }}>Delete Account</li>

function Dropdown(props) {
  return (
    <div className={ props.toggled ? 'header-dropdown' : 'nodisplay header-dropdown' }>
      <ul>
        <li onClick={() => {
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
  componentDidMount() {
    document.querySelector('body').addEventListener('click', this.toggleDropdown)
  }

  toggleDropdown(e) {
    let drop = false;
    if(e.target.className === 'header-toggle' || e.target.className === 'fa fa-bars') {
      console.log('true')
      drop = true;
    }else{
      console.log('false')
    }
    this.setState({
      dropDown:drop
    })
  }

  render() {
    return (
      <header>
        <div className="header-toggle" onClick={this.toggleDropdown}><i className="fa fa-bars" aria-hidden="true"></i></div>
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

