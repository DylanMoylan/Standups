import React from 'react'

function UsersConnected(props) {
  if(props.apiDataLoaded){
    return (
      <div className="users-connected">
        <h3>Users on {props.standupHistory[0].time_created.match(/([0-9]{4}-[0-9]+[-][0-9]{2})/)[1]}:</h3>
        <ul>
          {props.standupHistory.map((el) => {
            return <li
                      onClick={(e) => {props.showInfoBox(e, !props.infoBoxShown, el.id, true)}}
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
                      onClick={(e) => {props.showInfoBox(e, !props.infoBoxShown, el.id)}}
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
