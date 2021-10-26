import React from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'

  export const Card = ({ name, imageUrl, price, id }) => {

  return (
    <Link
      className="card"
      to={`/mobile/${id}`}
    >
      <img
        src={`https://mate-academy.github.io/phone-catalogue-static/${imageUrl}`}
        alt={name}
        className="card__image"
      />
      <span className="card__title">{name}</span>
      <span className="card__price">Price: ${price}</span>
    </Link>
  )
}
