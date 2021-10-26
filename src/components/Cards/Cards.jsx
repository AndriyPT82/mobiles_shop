import React from 'react'
import { Card } from '../Card'
import './Cards.scss'

export const Cards = ({ mobiles }) => {

  return (
    <ul className="cards">
      {
        mobiles.length
          ? mobiles.map(mobile => (
            <React.Fragment key={mobile.age}>
              <Card {...mobile} />
            </React.Fragment>
          ))
          : <p> Not Found</p>
      }
    </ul>
  )
}
