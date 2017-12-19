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
        <Standup
          standupHistory={this.state.standupHistory}
          apiDataLoaded={this.state.apiDataLoaded}
        />
      </div>
    )
  }
}

export default Dashboard
