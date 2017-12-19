import React from 'react'

function Infobox(props) {
  return (
    <div
      className={props.infoBoxShown ? 'info-box' : 'info-box nodisplay'}
      style={{
        left: props.infoBoxShown ? props.infoBoxShown.left : 0,
        top: props.infoBoxShown ? props.infoBoxShown.top : 0
      }}
    >
      <div><span>{props.currentStandup.email}</span><span>{props.currentStandup.time_created}</span></div>
      <div>Wins: {props.currentStandup.positives}</div>
      <div>Losses: {props.currentStandup.negatives}</div>
    </div>
  )
}

export default Infobox
