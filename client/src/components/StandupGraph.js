import React from 'react'
//<line x1={props.xoffset ? props.xoffset : "0"} y1="0" x2={props.xoffset ? props.xoffset : "0"} y2="300" strokeWidth="1" stroke="yellow"/>
// <line x1="0" y1={props.yoffset ? props.yoffset : "0"} x2="300" y2={props.yoffset ? props.yoffset : "300"} strokeWidth="1" stroke="yellow" />
function StandupGraph(props) {
  let color = ''
  if(props.connectedUsers && props.currentStandup){
    let findColor = props.connectedUsers.find(el => el.name === props.currentStandup.name)
    if(findColor){
      color = findColor.color
    }
  }
  return (
    <svg
      className="standup-graph"
      onClick={(e) => {
        props.showInfoBox(e, false)
        if(!props.dailySet){
          props.showForm(e)
        }
      }}
      onMouseMove={(e) => {
        if(!props.dailySet){
          props.setCirclePosition(e.nativeEvent.offsetX)
        }
      }}
    >
    {
      props.apiDataLoaded ?
      props.standupHistory.map((el) => {
        let positions = el.graph_position.split(',')
        return (
          <circle
            key={el.id}
            cx={positions[0]}
            cy={positions[1]}
            r="5"
            fill="red"
            className="circle hoverable"
            onClick={(e) => {
              props.showInfoBox(e, !props.infoBoxShown, el.id, {x:positions[0],y:positions[1]})
            }}
          />
        )
      })
      :
      (props.dailySet ? '' :
        <circle
        cx={props.currentStandup.graph_position.x}
        cy={props.currentStandup.graph_position.y}
        r="5"
        fill={color}
        className={props.dailySet ? `circle hoverable circle-${props.currentStandup.id}` : `circle circle-${props.currentStandup.id}`}
        onClick={(e) => {
          if(props.dailySet){
            props.showInfoBox(e, !props.infoBoxShown, props.currentStandup.id)
          }
        }}
      />
      )
    }
    {
      props.connectedUsers ?
        props.connectedUsers.map((el) => {
          if(el.name !== props.name && el.graph_position || el.name === props.name && props.dailySet) {
            return (
                    <g key={el.id}>
                    <circle
                      cx={el.graph_position.x}
                      cy={el.graph_position.y}
                      r="15"
                      fill="transparent"
                      className="circle-container"
                      onClick={(e) => {
                        props.showInfoBox(e, !props.infoBoxShown, el.id)
                      }}
                    />
                    <circle
                      cx={el.graph_position.x}
                      cy={el.graph_position.y}
                      r="5"
                      fill={el.color}
                      className={`circle hoverable circle-${el.id}`}
                    /></g>)
          }
        })
      :
        ''
    }
    <path d="M1 160 C 90 30, 130 20, 190 160 S 300 300, 369 160" stroke="black" fill="transparent"/>
    </svg>
  )
}

export default StandupGraph
