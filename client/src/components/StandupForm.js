import React from 'react'

function StandupForm(props) {
  return (
    <div className={props.visible ? 'standupForm' : 'standupForm hidden'}>
      <form onSubmit={(e) => {props.emitGraph(e)}}>
        <label>Name: <input type="text" onChange={props.handleInputChange} name="name" value={props.currentStandup ? props.currentStandup.name : ''} /></label>
        <label>Wins: <textarea onChange={props.handleInputChange} name="positives" value={props.currentStandup ? props.currentStandup.positives : ''} /></label>
        <label>Losses: <textarea onChange={props.handleInputChange} name="negatives" value={props.currentStandup ? props.currentStandup.negatives : ''} /></label>
        <input type="hidden" name="graph_position" value={props.currentStandup ? `${props.currentStandup.graph_position.x},${props.currentStandup.graph_position.y}` : ''} />
        <input type="submit" value="Submit standup!" disabled={props.currentStandup ? (props.currentStandup.graph_position !== '' && props.currentStandup.positives !== '' && props.currentStandup.negatives !== '') ? false : true : true}/>
        <input type="button" value="Cancel" onClick={(e) => {props.showForm(e)}} />
      </form>
    </div>
  )
}

export default StandupForm
