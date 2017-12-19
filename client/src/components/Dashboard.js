import React from 'react'
import Standup from './Standup'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      standupHistory: {},
      apiDataLoaded: false,
      tokenUrl: null
    }
    this.getRoomToken = this.getRoomToken.bind(this)
  }

  componentDidMount() {
    fetch(`/api/standup/${this.props.user.id}`, {
      credentials: 'include'
      })
    .then(res => res.json())
    .then(res => {
      this.setState({
        standupHistory: res.data,
        apiDataLoaded: true
      })
    }).catch(err => console.log(err))
  }

  getRoomToken() {
    if(!this.state.tokenUrl) {
      fetch('/genurl')
      .then(res => res.json())
      .then(res => {
        this.setState({
          tokenUrl: `${document.location.host}?sockettoken=${encodeURIComponent(res.token)}`
        })
      })
    }
  }

  render () {
    return (
      <div className="dashboard">
        <div className="new-room-btn" onClick={(e) => {this.getRoomToken()}}>{this.state.tokenUrl ? 'Room active - Share url:'+this.state.tokenUrl : 'Create a New Room'}</div>
        <Standup
          standupHistory={this.state.standupHistory}
          apiDataLoaded={this.state.apiDataLoaded}
        />
      </div>
    )
  }
}

export default Dashboard
