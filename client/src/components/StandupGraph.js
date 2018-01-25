import React from 'react'

class StandupGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      containerWidth: 370
    }
  }

  componentDidMount() {
    this.setState({
      containerWidth: document.querySelector('path').getTotalLength()
    })
  }

  render() {
    let color = ''
    if(this.props.connectedUsers && this.props.currentStandup){
      let findColor = this.props.connectedUsers.find(el => el.name === this.props.currentStandup.name)
      if(findColor){
        color = findColor.color
      }
    }
    return (
      <div
        className="svg-container"
        style={{width: this.state.containerWidth}}
        onMouseMove={(e) => {
          if(!this.props.dailySet){
            this.props.setCirclePosition(e.nativeEvent.offsetX)
          }
        }}
        onClick={(e) => {
          if(!this.props.dailySet && !this.props.apiDataLoaded){
            this.props.showForm(e)
          }
        }}
      >
        <svg
          width="370"
          height="300"
          className="standup-graph"
        >
        { this.props.dailySet || this.props.graphType !== 'live' ? '' :
            <circle
            cx={this.props.currentStandup.graph_position.x}
            cy={this.props.currentStandup.graph_position.y}
            r="5"
            fill={color}
            className={this.props.dailySet ? `circle hoverable circle-${this.props.currentStandup.id}` : `circle circle-${this.props.currentStandup.id}`}
            onClick={(e) => {
              if(this.props.dailySet){
                this.props.showInfoBox(e, this.props.currentStandup.id)
              }
            }}
          />
        }
        {
          this.props.connectedUsers ?
            this.props.connectedUsers.map((el) => {
              if( this.props.graphType === 'past-daily' ||
                  ((el.name !== this.props.name && el.graph_position) ||
                  (el.name === this.props.name && this.props.dailySet))
                ) {
                return (
                        <g key={el.id}>
                        <circle
                          cx={el.graph_position.x}
                          cy={el.graph_position.y}
                          r="15"
                          fill="transparent"
                          className="circle-container"
                          onClick={(e) => {
                            this.props.showInfoBox(e, el.id)
                          }}
                        />
                        <circle
                          cx={el.graph_position.x}
                          cy={el.graph_position.y}
                          r="5"
                          fill={el.color}
                          className={`circle hoverable circle-${el.id}`}
                        /></g>
                        )
                  } else {
                    return false
                  }
            })
          :
            ''
        }
        <path d="M1 160 C 90 30, 130 20, 190 160 S 300 300, 369 160" stroke="black" fill="transparent"/>
        </svg>
      </div>
    )
  }
}

export default StandupGraph
