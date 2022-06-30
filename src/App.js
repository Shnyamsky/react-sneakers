import { useState, useEffect } from 'react'

import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOdened] = useState(false)

  useEffect(() => {
    fetch('https://62bdaa89bac21839b6089ab1.mockapi.io/items').then(res => {
      return res.json()
    })
    .then(json => {
      setItems(json)
    })
  }, [])
  
  const onAddToCart = (itemData) => {
    setCartItems(prev => [...prev, itemData])
  }

  return (
    <div className="wrapper clear">
      {cartOpened && 
        <Drawer
          cartItems={cartItems}
          onCloseClick={() => setCartOdened(false)}
        />}
      <Header onCartClick={() => setCartOdened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map(item => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onPlusClick={(itemData) => onAddToCart(itemData)}
              onFavClick={() => console.log('Click to Fav btn')}
            />
          ))}
        </div>
      </div>
    </div>
  )}

export default App