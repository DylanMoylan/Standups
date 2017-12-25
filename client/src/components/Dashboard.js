import React from 'react'
import Standup from './Standup'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      standupHistory: {},
      apiDataLoaded: false
    }
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

  render () {
    return (
      <div className="dashboard">
        { this.props.tokenUrl ?
            <Standup
              token={this.props.token}
              user={this.props.user}
              tokenUrl={this.props.tokenUrl}
            />
          : <div className="new-room-btn" onClick={(e) => {this.props.getRoomToken()}}>Create a New Room</div>
        }
      </div>
    )
  }
}

export default Dashboard
