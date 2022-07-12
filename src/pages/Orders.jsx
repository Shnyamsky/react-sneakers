import { useEffect, useState } from 'react'
import axios from 'axios'

import Card from '../components/Card'

function Orders() {
  const [isLoading, setIsLoading] = useState(true)
  const [orderItems, setOrderItems] = useState([])
  
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/orders')
        setOrderItems(data.reduce((prev, order) => [...prev, ...order.items], []))
        setIsLoading(false)
        // setOrderItems(prev => [...prev, data])

        // console.log(data.map(order => order.items).flat())
        // console.log(data.reduce((prev, order) => [...prev, ...order.items], []))
      } catch(error) {
        alert('Не удалось загрузить заказы :(')
        console.error(error)
      }
      
    })()
  }, [])
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? Array(8).fill({}) : orderItems)
        .map(item => (
          <Card
            key={item.itemId}
            {...item}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  )}

export default Orders