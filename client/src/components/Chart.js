import React from 'react'

class Chart extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount(){
    fetch('/api/standup')
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return (
      <div className="chart">
        <p>Hello</p>
      </div>
    )
  }
}

export default Chart
