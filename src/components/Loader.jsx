import React from 'react'
import style from './loader.module.css'

const Loader = () => {
  return (
    <div className={style.container} >
      <div className={style.load_container} >
        <div className={style.linespinner} ></div >
      </div >
    </div >
  )
}

export default Loader