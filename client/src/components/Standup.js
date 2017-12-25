import React from 'react'
import StandupForm from './StandupForm'
import StandupGraph from './StandupGraph'
import Infobox from './Infobox'
import UsersConnected from './UsersConnected'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3002')

class Standup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStandup: {
        graph_position: {
          x:0,
          y:80
        },
        positives: '',
        negatives: '',
        token: (this.props.token ? this.props.token : null),
        name: (this.props.userName ? this.props.userName : this.props.user ? this.props.user.name : '')
      },
      visible: false,
      dailySet: false,
      xoffset: 0,
      yoffset: 0,
      infoBoxShown: false,
      connectedUsers: [],
      displayStandup: {},
      sessionOpen: (this.props.token || this.props.tokenUrl ? true : false),
      graphType: 'live',
      apiDataLoaded: this.props.apiDataLoaded,
      selectedDate: '',
      standupDates: [],
      standupDatesLoaded: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showForm = this.showForm.bind(this)
    this.setCirclePosition = this.setCirclePosition.bind(this)
    this.showInfoBox = this.showInfoBox.bind(this)
    this.emitGraph = this.emitGraph.bind(this)
    this.logSession = this.logSession.bind(this)
    this.focusTextInput = this.focusTextInput.bind(this)
    this.hideInfoBox = this.hideInfoBox.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentDidMount() {
    if(this.props.user) {
      fetch('/api/standup/dates/', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        let d = new Date(Date.now())
        d = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
        console.log(res.data.find(el => el.time_created.match(d)))
        this.setState({
          standupDates: res.data,
          standupDatesLoaded: true,
          selectedDate: res.data.find(el => el.time_created.match(d))
        })
      }).catch(err => console.log(err))
    }

    socket.emit('giveToken', this.state.currentStandup)
    // socket.emit('setGraph', this.state.currentStandup)
    socket.on('socket-users', (users) => {
      console.log(users)
      this.setState({
        connectedUsers: users
      })
    })
    socket.on('session-ended', (message) => {
      console.log(message)
      this.setState({
        sessionOpen: false,
        dailySet: true
      })
    })
  }

  componentWillReceiveProps(nextProps){
    if(!this.state.apiDataLoaded && nextProps.apiDataLoaded) {
      this.setState({
        apiDataLoaded:true
      })
    }
    if(!this.props.token && nextProps.token){
      this.setState((prevState, props) => {
        return {
          sessionOpen: true,
          apiDataLoaded: false,
          currentStandup: Object.assign({}, prevState.currentStandup, {token: nextProps.token})
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.currentStandup.token && this.state.currentStandup.token){
      socket.emit('giveToken', this.state.currentStandup)
    }
    if(!prevProps.standupHistory && this.props.standupHistory && this.props.standupHistory.length > 0){
      this.setState({
        selectedDate: this.props.standupHistory[0].time_created.match(/([0-9]{4}-[0-9]+[-][0-9]{2})/)[1]
      })
    }
  }

  handleSelectChange(event) {
    this.setState({
      selectedDate: event.target.value
    })
    fetch(`/api/standup/${encodeURIComponent(event.target.value)}`,{
      credentials: 'include'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          connectedUsers: res.data,
          graphType: 'past-daily'
        })
      })
  }

  logSession() {
    console.log('firing logsession')
    if(window.confirm('End this session, disconnecting all other users and saving this as your daily Standup?')){
      fetch(`/api/standup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(this.state.connectedUsers)
      })
      .then(res => {
        if(res.status === 200){
          socket.emit('end-session', {
            user: this.props.user,
            token: this.state.currentStandup.token
          })
        }else{
          console.log(res)
        }
      })
    }
  }

  fetchDaily() {
    fetch(`/api/standup/daily`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.data.length > 0) {
        let positions = res.data[0].graph_position.split(',')
        let x = positions[0]
        let y = positions[1]
        this.setState({
          currentStandup: {
            graph_position: {
              x: x,
              y: y
            },
            positives: res.data[0].positives,
            negatives: res.data[0].negatives,
            email: res.data[0].email,
            time_created: res.data[0].time_created
          },
          dailySet: true
        })
      }
    }).catch(err => console.log(err))
  }

  showInfoBox(event, id, histry) {
    event.stopPropagation()
      // let x = event.nativeEvent.clientX;
      // let y = event.nativeEvent.clientY;
      let bound = document.querySelector(`.circle-${id}`)
      if(bound){
        bound = bound.getBoundingClientRect()
        this.setState({
          infoBoxShown: {
            left: bound.x + bound.width,
            top: bound.y + bound.height
          }
        })
      }
      if(id) {
        if(histry){
          let findSelectedStandup = this.props.standupHistory.find((el) => el.id === id)
          this.setState({
            displayStandup: findSelectedStandup
          })
        }else{
          let findSelectedStandup = this.state.connectedUsers.find((el) => el.id === id)
          this.setState({
            displayStandup: findSelectedStandup
          })
        }
      }else{
        this.setState({
          displayStandup: this.state.currentStandup
        })
      }
    document.body.addEventListener('click',this.hideInfoBox)
  }

  hideInfoBox() {
    console.log('firing hideInfoBox')
    this.setState({
      infoBoxShown: false
    })
    document.body.removeEventListener('click',this.hideInfoBox)
  }

  setCirclePosition(e) {
    if(!this.state.visible){
      let x = document.querySelector('path').getPointAtLength(e)
      this.setState((prevState, props) => {
        return {
          currentStandup: Object.assign({}, prevState.currentStandup, {graph_position: {x: x.x, y: x.y}}),
          xoffset: x.x,
          yoffset: x.y
        }
      })
    }
  }

  focusTextInput() {
    console.log('firing focusTextInput')
    this.textInput.focus()
    this.textInput.select()
    document.execCommand('copy')
  }

  handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState((prevState,props) => {
      return {
        currentStandup: Object.assign({}, prevState.currentStandup, {[name]: value})
      }
    })
  }

  emitGraph(e) {
    e.preventDefault()
    socket.emit('setGraph',this.state.currentStandup)
    this.setState({
      dailySet: true,
      visible: true
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch('/api/standup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        graph_position: `${this.state.currentStandup.graph_position.x},${this.state.currentStandup.graph_position.y}`,
        positives: this.state.currentStandup.positives,
        negatives: this.state.currentStandup.negatives
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(this.fetchDaily())
  }

  showForm(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <div className="standup">
        <UsersConnected
          connectedUsers={this.state.connectedUsers}
          showInfoBox={this.showInfoBox}
          infoBoxShown={this.state.infoBoxShown}
          standupHistory={this.props.standupHistory}
          apiDataLoaded={this.state.apiDataLoaded}
          sessionOpen={this.state.sessionOpen}
          standupDates={this.state.standupDates}
          standupDatesLoaded={this.state.standupDatesLoaded}
          handleSelectChange={this.handleSelectChange}
        />
        {
          this.state.sessionOpen || this.props.user ?
          <div>
            <StandupGraph
              currentStandup={this.state.currentStandup}
              standupHistory={this.props.standupHistory}
              apiDataLoaded={this.state.apiDataLoaded}
              showForm={this.showForm}
              setCirclePosition={this.setCirclePosition}
              visible={this.state.visible}
              xoffset={this.state.xoffset}
              yoffset={this.state.yoffset}
              dailySet={this.state.dailySet}
              editable={true}
              showInfoBox={this.showInfoBox}
              infoBoxShown={this.state.infoBoxShown}
              connectedUsers={this.state.connectedUsers}
              name={this.state.currentStandup.name}
            />
            {
              this.props.user ?
                this.state.sessionOpen ?
                  <div>
                    <span className="room-active">Room active - Share url:</span>
                    <input ref={(input) => {this.textInput = input}} className="url-value" type="text" value={this.props.tokenUrl || ''} readOnly />
                    <button onClick={this.focusTextInput}>Copy to Clipboard</button>
                    <input type="button" value="end this session" onClick={this.logSession} />
                  </div>
                :
                  <div>
                    <div className="room-inactive">Room inactive</div>
                    <div className="new-room-btn" onClick={(e) => {
                      if(this.state.apiDataLoaded){
                        if(window.confirm("Warning: A Standup has already been saved for today. Data saved from a new session will overwrite this existing Standup. Continue anyway?")){
                          this.props.getRoomToken()
                        }
                      }else{
                        this.props.getRoomToken()
                      }
                    }}>Create a New Room</div>
                  </div>
              : ''
            }
          </div>
          :
          <div className="session-ended">The session leader has concluded this session. Your submission has been recorded.</div>
        }
        <Infobox
          infoBoxShown={this.state.infoBoxShown}
          currentStandup={this.state.displayStandup}
        />
        <StandupForm
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          currentStandup={this.state.currentStandup}
          visible={this.state.visible}
          showForm={this.showForm}
          emitGraph={this.emitGraph}
          dailySet={this.state.dailySet}
        />
      </div>
    )
  }
}

export default Standup
