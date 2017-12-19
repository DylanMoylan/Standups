import React from 'react'

function GroupListing(props) {
  return (
    <div className="group-listing">
      {props.groupsDataLoaded ?
        <ul>
          {props.groups.map((el) => {
            return <li key={el.id}>{el.group_name}</li>
          })}
        </ul>
        : <p>Loading...</p>
      }
      <div className="create-group">
        <form onSubmit={props.createGroup}>
          <input name="group_name" placeholder="Group Name" onChange={props.handleInputChange} value={props.groupToCreate} />
          <input type="submit" value="Create group" />
        </form>
      </div>
    </div>
  )
}

export default GroupListing
