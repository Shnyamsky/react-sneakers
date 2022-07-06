import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Home from './pages/Home'
import Favorites from './pages/Favorites'

import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
  // Items states
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favItems, setFavItems] = useState([])
  
  // Cart and search states
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  // MockAPI 1st loading
  useEffect(() => {
    axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/items').then(res => {
      setItems(res.data)
    })
    
    axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })

    axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites').then(res => {
      setFavItems(res.data)
    })
  }, [])
  
  // Cart add and remove
  const onAddToCart = (itemData) => {
    if (cartItems.find(cartItem => Number(cartItem.id) === Number(itemData.id))) {
      axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/cart/${itemData.id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(itemData.id)))
    } else {
      axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/cart', itemData)
      setCartItems(prev => [...prev, itemData])
    }
  }
  const onRemoveCartItem = (id) => {
    axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  // Favorites add and remove
  const onFavorite = async (itemData) => {
    try {
      if (favItems.find(favItem => favItem.id === itemData.id)) {
        axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/favorites/${itemData.id}`)
      } else {
        const { data } = await axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites', itemData)
        setFavItems(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
    }

    //async (itemData) -> (itemData)
    // if (favItems.find(favItem => favItem.id === itemData.id)) {
    //   axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/favorites/${itemData.id}`)
    //   setFavItems(prev => prev.filter(item => item.id !== itemData.id))
    // } else {
    //   axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites', itemData)
    //   setFavItems(prev => [...prev, itemData])
    // }
  }

  // Input changes
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const onClickClearBtn = () => {
    setSearchValue('')
  }

  return (
    <div className="wrapper clear">
      {cartOpened && 
        <Drawer
          onCloseClick={() => setCartOpened(false)}
          onRemove={onRemoveCartItem}
          cartItems={cartItems}
        />}
      <Header
        onCartClick={() => setCartOpened(true)}
      />

      <Routes>
        <Route path="/" element={<Home
          items={items}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onFavorite={onFavorite}
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
          onClickClearBtn={onClickClearBtn}
        />} />
          
        <Route path="/favorites" element={<Favorites
          items={favItems}
          onFavorite={onFavorite}
        />} />
      </Routes>
    </div>
  )}

export default App