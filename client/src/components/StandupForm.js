import React from 'react'

function StandupForm(props) {
  return (
    <div className={props.visible ? 'standupForm' : 'standupForm hidden'}>
      <form onSubmit={(e) => {props.emitGraph(e)}}>
        <h3>Submit Standup</h3>
        <label>Name: <input type="text" onChange={props.handleInputChange} name="name" value={props.currentStandup ? props.currentStandup.name : ''} /></label>
        <label>Wins: <textarea onChange={props.handleInputChange} disabled={props.dailySet ? true : false} name="positives" value={props.currentStandup ? props.currentStandup.positives : ''} /></label>
        <label>Losses: <textarea onChange={props.handleInputChange} disabled={props.dailySet ? true : false} name="negatives" value={props.currentStandup ? props.currentStandup.negatives : ''} /></label>
        <input type="hidden" name="graph_position" value={props.currentStandup ? `${props.currentStandup.graph_position.x},${props.currentStandup.graph_position.y}` : ''} />
        <input type="submit" className={props.dailySet ? 'daily-set' : ''} value={props.dailySet ? "Standup Submitted!" : "Submit standup!"} disabled={props.dailySet ? true : props.currentStandup ? (props.currentStandup.graph_position !== '' && props.currentStandup.positives !== '' && props.currentStandup.negatives !== '') ? false : true : true}/>
        <input type="button" className={props.dailySet ? 'daily-set' : ''} value="Close" onClick={(e) => {props.showForm(e)}} />
      </form>
    </div>
  )
}

export default StandupForm
