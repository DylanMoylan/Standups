import React from 'react'

function UsersConnected(props) {
  if(props.connectedUsers){
    return (
      <div className="users-connected">
        <ul>
          {props.connectedUsers.map((el) => {
            return <li key={el.id}>{el.name ? el.name : 'Unknown User'}</li>
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
