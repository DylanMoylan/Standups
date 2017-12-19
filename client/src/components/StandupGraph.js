import React from 'react'
//<line x1={props.xoffset ? props.xoffset : "0"} y1="0" x2={props.xoffset ? props.xoffset : "0"} y2="300" strokeWidth="1" stroke="yellow"/>
// <line x1="0" y1={props.yoffset ? props.yoffset : "0"} x2="300" y2={props.yoffset ? props.yoffset : "300"} strokeWidth="1" stroke="yellow" />
function StandupGraph(props) {
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
            cx={positions[0]}
            cy={positions[1]}
            r="5"
            fill="red"
            className="circle hoverable"
            onClick={(e) => {
              e.stopPropagation()
              props.showInfoBox(e, true, el.id)
            }}
          />
        )
      })
      :
      <circle
        cx={props.graph_position.x}
        cy={props.graph_position.y}
        r="5"
        fill="red"
        className={props.dailySet ? 'circle hoverable' : 'circle'}
        onClick={(e) => {
          e.stopPropagation()
          if(props.dailySet){
            props.showInfoBox(e, true)
          }
        }}
      />
    }
    <path d="M1 160 C 90 30, 130 20, 190 160 S 300 300, 369 160" stroke="black" fill="transparent"/>
    </svg>
  )
}

export default StandupGraph
