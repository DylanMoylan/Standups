import React from 'react'
import { Link } from 'react-router-dom'
function AppInfo(props) {
  return (
    <div className="app-info">
      <div>
        <p>Some Basic info about the app.</p>
      </div>
      <div>
        <p>Some more basic info about the app.</p>
        <Link to="/Chart"><div>Go to Chart</div></Link>
      </div>
    </div>
  )
}

export default AppInfo
