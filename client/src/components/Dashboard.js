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
        standupHistory: cres,
        apiDataLoaded: true
      })
    }).catch(err => console.log(err))
  }

  render () {
    return (
      <div className="dashboard">
        <Standup
          token={this.props.token}
          user={this.props.user}
          tokenUrl={this.props.tokenUrl}
          standupHistory={this.state.standupHistory}
          apiDataLoaded={this.state.apiDataLoaded}
          getRoomToken={this.props.getRoomToken}
        />
      </div>
    )
  }
}

export default Dashboard
