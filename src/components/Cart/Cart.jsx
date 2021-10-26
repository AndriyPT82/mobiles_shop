import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Card } from '../Card'
import './Cart.scss'

export const Cart = ({ cart, setOpenCart, setCart }) => {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = (event) => {
    if (event.target !== event.currentTarget) return;
    setIsOpen(false)
    setTimeout(() => {
      setOpenCart(false)
    }, 300);

  }

  const totalPrice = cart.reduce((total, good) => {
    total += good.price
    return total;
  }, 0)

  return (
    <div
      className="cart"
      onClick={handleClose}
    >
      <div
        className={classNames(
          'cart__content',
          { 'cart__content--is-active': isOpen }
        )}
      >
        <div
          className="cart__close"
          onClick={handleClose}
        > ✕</div>
        <ul className="cart__goods">
          {
            !cart.length
              ? <h2>Cart is Empty</h2>
              : cart.map(good => (
                <li className="cart__good" key={good.age}>
                  <span
                    className="cart__good-delete"
                    onClick={() => {
                      setCart(state => (
                        state.filter(obj => obj.id !== good.id)
                      ))
                    }}
                  >
                    ❌
                  </span>
                  <Card {...good} />
                </li>
              ))
          }
        </ul>
        <div className="cart__info">

          <div className="cart__count-goods">
            <span>Count goods:</span> {cart.length}

          </div>
          <div className="cart__total-cost">
            <span>Total:</span> ${totalPrice.toFixed(2)}
          </div>
          <button
            className="cart__button"
            disabled={!cart.length}
          >
            Pay
          </button>

        </div>
      </div>
    </div>
  )
}
