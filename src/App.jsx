import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { Menu } from './components/Menu';
import { getData } from './API/api'
import './App.scss'
import { SearchField } from './components/SearchField'
import { SortSelect } from './components/SortSelect'
import { Tabs } from './components/Tabs'
import { NavBar } from './components/NavBar'
import { Cards } from './components/Cards'
import { Popup } from './components/Popup'
import { Cart } from './components/Cart';

export const AppContext = React.createContext()

const handleSearch = (array, text) => {

  return array.filter(obj => {
    return obj.name.toLowerCase().includes(text.toLowerCase())
  })
}
const handleSort = (arr, sortKey, orderby) => {

  return [...arr].sort((a, b) => {
    const [A, B] = orderby === 'asc' ? [a, b] : [b, a]

    if (sortKey === 'price') {
      return +A.price - +B.price;
    }

    return A.name.localeCompare(B.name);
  })
}

function App() {

  const [mobiles, setMobiles] = useState([])
  const [openSearchField, setOpenSearchField] = useState(false)
  const [queryResult, setQueryResult] = useState([])
  const [cart, setCart] = useState([])
  const [openCart, setOpenCart] = useState(false)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!localStorage.mobiles) {
      getData().then(data => {
        const mobiles = JSON.stringify(data)
        const cart = JSON.stringify([])
        localStorage.setItem('mobiles', mobiles)
        localStorage.setItem('cart', cart)
        setMobiles(data)
        // setCart([])

      })
    }

    const mobiles = localStorage.getItem('mobiles')
    const cart = localStorage.getItem('cart')

    const parsedMobiles = JSON.parse(mobiles)
    const parsedCart = JSON.parse(cart)

    setMobiles(parsedMobiles)
    setCart(parsedCart)
  }, [])

  useEffect(() => {
    if (!cart.length) return;
    localStorage.setItem('cart', JSON.stringify(cart))

  }, [cart])

  useEffect(() => {
    if (!query) {
      setQueryResult([])
      return
    }

    setQueryResult(handleSearch(mobiles, query))
  }, [query])

  const filteredData = !!query ? queryResult : mobiles;
  const toDisplay = handleSort(filteredData || [], sort, order);

  return (
    <AppContext.Provider
      value={{
        mobiles,
        setOpenSearchField,
        setCart,
        cart
      }}>
      <div className="App">
        {
          openCart && <Cart
            cart={cart}
            setCart={setCart}
            setOpenCart={setOpenCart}
          />
        }
        <Route path="/mobile/:mobileId" component={Popup} />
        <div className="header">
          <div className="container">
            {!!openSearchField && <SearchField setOpenSearchField={setOpenSearchField} />}
            <NavBar setOpenCart={setOpenCart} />
          </div>
        </div>
        <Route path="/menu" component={Menu} />
        <div className="main">
          <div className="container">
            <div className="main__content">
              <div className="main__controlers">
                <Tabs
                  setQueryResult={setQueryResult}
                  setOpenSearchField={setOpenSearchField}
                  queryResult={queryResult}
                />
                <SortSelect />
              </div>
              <Switch>
                <Route path={`/:path`} >
                  <Cards mobiles={toDisplay} />
                </Route>
                <Redirect from="/" to="/mobiles" />
                <h2>Page Not Found</h2>
              </Switch>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="footer__content">
              Footer
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>

  );
}

export default App;
