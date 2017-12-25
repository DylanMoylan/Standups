import React from 'react'
import Standup from './Standup'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      standupHistory: {},
      apiDataLoaded: false
    }
    this.focusTextInput = this.focusTextInput.bind(this)
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

  focusTextInput() {
    console.log('firing focusTextInput')
    this.textInput.focus()
    this.textInput.select()
    document.execCommand('copy')
  }

  render () {
    return (
      <div className="dashboard">
        { this.props.tokenUrl ?
            <div>
            <Standup
              token={this.props.token}
              user={this.props.user}
            />
                <div>
                  Room active - Share url:
                  <input ref={(input) => {this.textInput = input}} className="url-value" type="text" value={this.props.tokenUrl} readOnly />
                  <button onClick={this.focusTextInput}>Copy to Clipboard</button>
                </div>
              </div>
          : <div className="new-room-btn" onClick={(e) => {this.props.getRoomToken()}}>Create a New Room</div>
        }
      </div>
    )
  }
}

export default Dashboard
