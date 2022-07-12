import { useEffect, useState } from 'react'
import axios from 'axios'

import Card from '../components/Card'
import Info from '../components/Info'

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
        <div className="items-grid">
          {(isLoading ? Array(4).fill({}) : orderItems)
          .map(item => (
              <Card
                key={item.itemId}
                {...item}
                loading={isLoading}
              />
          ))}
        </div>
        {(!orderItems.length && !isLoading) &&
          <Info 
          title={"У вас нет заказов"}
          description={`Уже выбрали кроссовки?\n
            Оформите хотя бы один заказ!`}
          image={"/img/emoji-order.png"}
          isPage
        />
        }
    </div>
  )}

export default Orders