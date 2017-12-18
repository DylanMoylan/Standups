import React from 'react'
import StandupForm from './StandupForm'
import StandupGraph from './StandupGraph'

class Standup extends React.Component {
  constructor(){
    super()
    this.state = {
      currentStandup: {
        graph_position: '',
        positives: '',
        negatives: '',
        visible: false
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setGraphPosition = this.setGraphPosition.bind(this)
    this.showForm = this.showForm.bind(this)
  }

  setGraphPosition(num) {
    if(num > 0){
      this.setState((prevState, props) => {
        return {
          currentStandup: Object.assign({}, prevState.currentStandup, {graph_position: num})
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
    fetch('/api/standup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.currentStandup)
    })
    .then(res => res.json())
    .then(res => console.log(res))
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
          setGraphPosition={this.setGraphPosition}
          curretGraphPosition={this.state.currentStandup.graph_position}
          showForm={this.showForm}
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
