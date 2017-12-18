import React from 'react'

function StandupGraph(props) {
  return (
    <div className="standup-graph" onClick={(e) => {
      console.log(e.clientX)
      //props.setGraphPosition(e)
    }}>
      <div className="gsection graph-section1"></div>
      <div className="gsection graph-section2"></div>
      <div className="gsection graph-section3"></div>
      <div className="gsection graph-section4"></div>
      <div className="gsection graph-section5"></div>
    </div>
  )
}

export default StandupGraph
