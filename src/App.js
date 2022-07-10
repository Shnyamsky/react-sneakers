import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Home from './pages/Home'
import Favorites from './pages/Favorites'

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

  //Loading items state
  const [isLoading, setIsLoading] = useState(true)

  // MockAPI 1st loading
  useEffect(() => {
    async function fetchData() {
      //TODO: Promise:all
      try {
        setIsLoading(true)
        const itemsCartResponse = await axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/cart')
        const itemsFavoriesResponse = await axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites')
        const itemsResponse = await axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/items')

        setItems(itemsResponse.data)
        setCartItems(itemsCartResponse.data)
        setFavItems(itemsFavoriesResponse.data)
        setIsLoading(false)
      } catch(error) {
        alert('Не удалось загрузить данные :(')
      }
    }

    fetchData()
  }, [])
  
  // Cart add and remove
  const onCart = async (itemData) => {
    try {
      if (cartItems.find(cartItem => Number(cartItem.itemId) === Number(itemData.itemId))) {
        axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/cart/${itemData.id}`)
        setCartItems(prev => prev.filter(item => Number(item.itemId) !== Number(itemData.itemId)))
      } else {
        const {data} = await axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/cart', itemData)
        setCartItems(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  // Favorites add and remove
  const onFavorite = async (itemData) => {
    try {
      if (favItems.find(favItem => Number(favItem.itemId) === Number(itemData.itemId))) {
        axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/favorites/${itemData.id}`)
        setFavItems(prev => prev.filter(item => Number(item.itemId) !== Number(itemData.itemId)))
      } else {
        const { data } = await axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/favorites', itemData)
        setFavItems(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
    }
  }

  // Input changes
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const onClickClearBtn = () => {
    setSearchValue('')
  }

  //check added items to cart and favorites
  const isCartItemAdded = (itemId) => {
    return cartItems.some(cartItem => Number(cartItem.itemId) === Number(itemId))
  }

  const isFavItemAdded = (itemId) => {
    return favItems.some(favItem => Number(favItem.itemId) === Number(itemId))
  }

  return (
    <AppContext.Provider value={{ 
      items, cartItems, 
      setCartItems, favItems, 
      setCartOpened,
      onCart, 
      onFavorite, 
      isCartItemAdded, 
      isFavItemAdded
     }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer />}
        <Header onCartClick={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            onClickClearBtn={onClickClearBtn}
            isLoading={isLoading}
          />} />
            
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )}

export default App