import React from 'react'
import StandupForm from './StandupForm'
import StandupGraph from './StandupGraph'
import Infobox from './Infobox'

class Standup extends React.Component {
  constructor(){
    super()
    this.state = {
      currentStandup: {
        graph_position: {
          x:0,
          y:80
        },
        positives: '',
        negatives: '',
        visible: false,
        dailySet: false
      },
      xoffset: 0,
      yoffset: 0,
      infoBoxShown: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showForm = this.showForm.bind(this)
    this.setCirclePosition = this.setCirclePosition.bind(this)
    this.showInfoBox = this.showInfoBox.bind(this)
  }

  componentDidMount() {
    if(!this.props.apiDataLoaded){
      this.fetchDaily()
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

  showInfoBox(event, toggle, id) {
    if(toggle){
      let x = event.nativeEvent.clientX;
      let y = event.nativeEvent.clientY;
      this.setState({
        infoBoxShown: {
          left: x,
          top: y
        }
      })
      if(id) {
        let findSelectedStandup = this.props.standupHistory.find((el) => el.id === id)
        this.setState({
          currentStandup: findSelectedStandup
        })
      }
    }else{
      this.setState({
        infoBoxShown: false
      })
    }
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

  handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState((prevState,props) => {
      return {
        currentStandup: Object.assign({}, prevState.currentStandup, {[name]: value})
      }
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
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <div className="standup">
        <StandupGraph
          standupHistory={this.props.standupHistory}
          apiDataLoaded={this.props.apiDataLoaded}
          graph_position={this.state.currentStandup.graph_position}
          showForm={this.showForm}
          setCirclePosition={this.setCirclePosition}
          visible={this.state.visible}
          xoffset={this.state.xoffset}
          yoffset={this.state.yoffset}
          dailySet={this.state.dailySet}
          editable={true}
          showInfoBox={this.showInfoBox}
        />
        <Infobox
          infoBoxShown={this.state.infoBoxShown}
          currentStandup={this.state.currentStandup}
        />
        <StandupForm
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          currentStandup={this.state.currentStandup}
          visible={this.state.visible}
          showForm={this.showForm}
        />
      </div>
    )
  }
}

export default Standup
