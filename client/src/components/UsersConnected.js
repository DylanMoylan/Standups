import React from 'react'

function UsersConnected(props) {
  if(props.apiDataLoaded && !props.sessionOpen){
    return (
      <div className="users-connected">
        <div>Users on
          {
            props.standupDatesLoaded && props.standupDates.length > 1 ?
              <select value={props.selectedDate} onChange={props.handleSelectChange}>
                {
                  props.standupDates.map((el, index) => {
                    return <option value={el.time_created.match(/([0-9]{4}-[0-9]+[-][0-9]{2})/)[1]} key={index}>{el.time_created.match(/([0-9]{4}-[0-9]+[-][0-9]{2})/)[1]}</option>
                  })
                }
              </select>
            :
              props.standupHistory[0].time_created.match(/([0-9]{4}-[0-9]+[-][0-9]{2})/)[1]
          }</div>
        <ul>
          {props.standupHistory.map((el) => {
            return <li
                      onClick={(e) => {props.showInfoBox(e, el.id, true)}}
                      key={el.id}>
                      {el.name ? el.name : 'Unknown User'}
                      <div className="user-indicator" style={{backgroundColor: el.color}}></div>
                    </li>
          })
          }
        </ul>
      </div>
    )
  }else{
    return (
      <div className="users-connected">
        <h3>Current Users: </h3>
        <ul>
          {props.connectedUsers.map((el) => {
            return <li
                      onClick={(e) => {props.showInfoBox(e, el.id)}}
                      key={el.id}>
                        {el.name ? el.name : 'Unknown User'}
                        <div className="user-indicator" style={{backgroundColor: el.color}}></div>
                    </li>
          })}
        </ul>
      </div>
    )
  }
}

export default UsersConnected
