import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { AppContext } from '../../App'

import './CardDetails.scss'

export const CardDetails = ({ handleClick }) => {

  const [mobile, setMobile] = useState(null)
  const { mobiles, setCart, cart } = useContext(AppContext)
  const { mobileId } = useParams()

  useEffect(() => {
    const mobile = mobiles.find(mobile => mobile.id === mobileId);
    setMobile(mobile)
  })

  if (!mobile) {
    return <h2>Not Found</h2>;
  }

  const {
    id,
    imageUrl,
    name,
    price,
    snippet: description,
  } = mobile;

  const isInCart = cart.some(obj => obj.id === id)

  return (
    <div className="card-details">
      <div className="card-details__image">
        <img
          src={`https://mate-academy.github.io/phone-catalogue-static/${imageUrl}`}
          alt={name}
        />
      </div>
      <div className="card-details__about">
        <div className="card-details__title">
          <span>Title :</span> {name}
        </div>
        <div className="card-details__description">
          <span>Description:</span> {description}
        </div>
        <div className="card-details__price"><span>Price:</span> ${price}</div>
        <button
          className="card-details__button"
          onClick={(event) => {
            setCart(state => [...state, mobile])
            handleClick(event)
          }}
          disabled={!!isInCart}
        >
          {
            !!isInCart ? 'Is in Cart' : 'Buy'
          }
        </button>
      </div>
    </div>
  )
}
