import React from 'react'

function StandupForm(props) {
  return (
    <div className="StandupForm">
      <form onSubmit={props.handleSubmit}>
        <label>Wins: <textarea onChange={props.handleInputChange} name="positives" value={props.currentStandup ? props.currentStandup.positives : ''} /></label>
        <label>Losses: <textarea onChange={props.handleInputChange} name="negatives" value={props.currentStandup ? props.currentStandup.negatives : ''} /></label>
        <input type="hidden" name="graph_position" value={props.currentStandup ? props.currentStandup.graph_position : ''} />
        <input type="submit" value="Submit standup!" disabled={props.currentStandup ? (props.currentStandup.graph_position !== '' && props.currentStandup.positives !== '' && props.currentStandup.negatives !== '') ? false : true : true}/>
      </form>
    </div>
  )
}

export default StandupForm
