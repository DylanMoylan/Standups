import React from 'react'

function StandupGraph(props) {
  return (
    <svg
      className="standup-graph"
      onClick={(e) => {
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
    <line x1={props.xoffset ? props.xoffset : "0"} y1="0" x2={props.xoffset ? props.xoffset : "0"} y2="300" strokeWidth="1" stroke="yellow"/>
    <line x1="0" y1={props.yoffset ? props.yoffset : "0"} x2="300" y2={props.yoffset ? props.yoffset : "300"} strokeWidth="1" stroke="yellow" />
    <circle cx={props.graph_position.x} cy={props.graph_position.y} r="5" fill="red"/>
    <path d="M0 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
    </svg>
  )
}

export default StandupGraph
