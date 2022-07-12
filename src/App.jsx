import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

import Header from './components/Header'
import Drawer from './components/Drawer'

import AppContext from './context'

function App() {
  // Items states
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favItems, setFavItems] = useState([])
  
  // Cart and search states
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // MockAPI 1st loading
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [itemsCartResponse, itemsFavoriesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/cart'), 
          axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites'), 
          axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/items')
        ])

        setItems(itemsResponse.data)
        setCartItems(itemsCartResponse.data)
        setFavItems(itemsFavoriesResponse.data)
        setIsLoading(false)
      } catch(error) {
        alert('Не удалось загрузить данные :(')
        console.error(error)
      }
    }

    fetchData()
  }, [])
  
  // Cart add and remove
  const onCart = async (itemData) => {
    try {
      const findItem = cartItems.find(cartItem => Number(cartItem.itemId) === Number(itemData.itemId))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.itemId) !== Number(itemData.itemId)))
        await axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, itemData])
        const { data } = await axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/cart', itemData)

        setCartItems(prev => prev.map(item => {
          if (Number(item.itemId) === Number(data.itemId)) {
            return {...item, id: data.id}
          }
          return item
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
      console.error(error)
    }
  }

  // Favorites add and remove
  const onFavorite = async (itemData) => {
    try {
      const findItem = favItems.find(favItem => Number(favItem.itemId) === Number(itemData.itemId))
      if (findItem) {
        setFavItems(prev => prev.filter(item => Number(item.itemId) !== Number(itemData.itemId)))
        await axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/favorites/${findItem.id}`)
      } else {
        setFavItems(prev => [...prev, itemData])
        const { data } = await axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites', itemData)
        
        setFavItems(prev => prev.map(item => {
          if (Number(item.itemId) === Number(data.itemId)) {
            return {...item, id: data.id}
          }
          return item
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
      console.error(error)
    }
  }

  // Input changes
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const onClickClearBtn = () => {
    setSearchValue('')
  }

  // Check added items to cart and favorites
  const isCartItemAdded = (itemId) => {
    return cartItems.some(cartItem => Number(cartItem.itemId) === Number(itemId))
  }

  const isFavItemAdded = (itemId) => {
    return favItems.some(favItem => Number(favItem.itemId) === Number(itemId))
  }

  return (
    <AppContext.Provider value={{ 
      items,
      cartItems, setCartItems,
      favItems,
      cartOpened, setCartOpened,
      onCart,
      onFavorite,
      isCartItemAdded,
      isFavItemAdded,
      isLoading
     }}>
      <div className="wrapper clear">
        <Drawer />
        <Header onCartClick={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            onClickClearBtn={onClickClearBtn}
          />} />
            
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )}

export default App