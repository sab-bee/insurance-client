import React from 'react'
import style from './spinner.module.css'

const Spinner = ({ loading }) => {
  return (
    <div role="status">
      <svg className={`${!loading ? 'hidden' : 'inline'} ${style.spinner}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50" cy="50" r="30"
          fill="transparent"
          strokeWidth="8px"
          strokeDasharray="160"
        />
      </svg>
    </div>
  )
}

export default Spinner