import React from 'react'
import { Picker } from 'emoji-mart'
import '../../node_modules/emoji-mart/css/emoji-mart.css'
// function StandupForm(props) {
//   return (
//     <div className={props.visible ? 'standupForm' : 'standupForm hidden'}>
//       <form onSubmit={(e) => {props.emitGraph(e)}}>
//         <h3>Submit Standup</h3>
//         <div className={ props.}><Picker title="" emoji="" /></div>
//         <div className="name-avatar">
//           <label style={{
//             marginBottom: 0
//           }}>Name: <input type="text" onChange={props.handleInputChange} name="name" value={props.currentStandup ? props.currentStandup.name : ''} /></label>
//           <div className="toggle-emoji">&#x9786;</div>
//         </div>
//         <label>Wins: <textarea onChange={props.handleInputChange} disabled={props.dailySet ? true : false} name="positives" value={props.currentStandup ? props.currentStandup.positives : ''} /></label>
//         <label>Losses: <textarea onChange={props.handleInputChange} disabled={props.dailySet ? true : false} name="negatives" value={props.currentStandup ? props.currentStandup.negatives : ''} /></label>
//         <input type="hidden" name="graph_position" value={props.currentStandup ? `${props.currentStandup.graph_position.x},${props.currentStandup.graph_position.y}` : ''} />
//         <input type="submit" className={props.dailySet ? 'daily-set' : ''} value={props.dailySet ? "Standup Submitted!" : "Submit standup!"} disabled={props.dailySet ? true : props.currentStandup ? (props.currentStandup.graph_position !== '' && props.currentStandup.positives !== '' && props.currentStandup.negatives !== '') ? false : true : true}/>
//         <input type="button" className={props.dailySet ? 'daily-set' : ''} value="Close" onClick={(e) => {props.showForm(e)}} />
//       </form>
//     </div>
//   )
// }

// export default StandupForm
function StandupForm(props) {
  return (
    <div className={props.visible ? 'standupForm' : 'standupForm hidden'}>
      <form onSubmit={(e) => {props.emitGraph(e)}}>
        <h3>Submit Standup</h3>
        <div className={ props.emojiVisible ? '' : 'nodisplay' }>
          <Picker
            title=""
            emoji=""
            onClick={props.setEmoji}
          />
        </div>
        <div className="name-avatar">
          <label style={{
            marginBottom: 0
          }}>Name: <input type="text" onChange={props.handleInputChange} name="name" value={props.currentStandup ? props.currentStandup.name : ''} /></label>
          <div className="toggle-emoji" onClick={props.toggleEmoji}>{ props.currentStandup.emoji ? props.currentStandup.emoji : 'Avatar' }</div>
        </div>
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
