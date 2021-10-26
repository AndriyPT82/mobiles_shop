import React, { useEffect } from 'react'
import './Popup.scss'
import { CardDetails } from '../CardDetails'

export const Popup = ({ history }) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, [])

  const handleClick = (event) => {
    if (event.target !== event.currentTarget) return;
    history.goBack()
  }

  return (
    <div className="popup" onClick={handleClick}>
      <div className="popup__content">
        <div className="popup__closer" onClick={handleClick}>  ✕ </div>
        <CardDetails handleClick={handleClick}/>
      </div>
    </div>
  )
}
