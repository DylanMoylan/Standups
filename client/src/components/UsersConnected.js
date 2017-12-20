import React from 'react'

function UsersConnected(props) {
  if(props.connectedUsers){
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
  }else{
    return (
      <div>...</div>
    )
  }
}

export default UsersConnected
