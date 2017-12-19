import React from 'react'
import StandupForm from './StandupForm'
import StandupGraph from './StandupGraph'

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
      yoffset: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showForm = this.showForm.bind(this)
    this.setCirclePosition = this.setCirclePosition.bind(this)
  }

  componentDidMount() {
    this.fetchDaily()
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
            negatives: res.data[0].negatives
          },
          dailySet: true
        })
      }
    }).catch(err => console.log(err))
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
          graph_position={this.state.currentStandup.graph_position}
          showForm={this.showForm}
          setCirclePosition={this.setCirclePosition}
          visible={this.state.visible}
          xoffset={this.state.xoffset}
          yoffset={this.state.yoffset}
          dailySet={this.state.dailySet}
          editable={true}
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
