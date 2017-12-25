import React from 'react'
import Standup from './Standup'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      standupHistory: [],
      apiDataLoaded: false
    }
  }

  componentDidMount() {
    fetch(`/api/standup/${this.props.user.id}`, {
      credentials: 'include'
      })
    .then(res => res.json())
    .then(res => {
      let colors = ['red','green','blue','yellow','orange','purple','black']
      let cres = res.data.map((el) => {
        return el.color = colors.pop()
      })
      this.setState({
        standupHistory: res.data,
        apiDataLoaded: true
      })
    }).catch(err => console.log(err))
  }

  render () {
    return (
      <div className="dashboard">
        { this.props.tokenUrl || this.state.standupHistory.length > 0 ?
            <Standup
              token={this.props.token}
              user={this.props.user}
              tokenUrl={this.props.tokenUrl}
              standupHistory={this.state.standupHistory}
              apiDataLoaded={this.state.apiDataLoaded}
            />
          : <div className="new-room-btn" onClick={(e) => {this.props.getRoomToken()}}>Create a New Room</div>
        }
      </div>
    )
  }
}

export default Dashboard
