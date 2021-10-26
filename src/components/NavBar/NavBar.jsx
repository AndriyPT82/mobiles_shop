import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import { AppContext } from '../../App'

export const NavBar = ({ setOpenCart }) => {

  const { setOpenSearchField } = useContext(AppContext);

  return (
    <div className="navbar">
      <div className="navbar__navigation">
        <Link to="/menu" className="navbar__menu">
          ☰
        </Link>
        <img
          className="navbar__search"
          onClick={() => setOpenSearchField(true)}
          src="https://www.toptal.com/designers/htmlarrows/assets/images/search-button-c0042ed6.svg"
          alt=""
        />
      </div>

      <div
        className="navbar__logo"
      >
        <Link to="/">
          STORE
        </Link>
      </div>
      <div className="navbar__orders">
        <a href="tel:+351910342177" className="navbar__call">☎</a>
        <div
          className="navbar__basket"
          onClick={() => setOpenCart(true)}
        >
          🗑
        </div>
      </div>
    </div>
  )
}
