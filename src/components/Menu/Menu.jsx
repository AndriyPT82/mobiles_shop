import React, { useEffect} from 'react'
import './Menu.scss'

export const Menu = () => {

  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => document.body.style.overflow = 'unset';
  // }, [])

  return (
    <div className="menu">
      <div className="menu__content">
        <a className="menu__close" href="">X</a>
      </div>
    </div>
  )
}
