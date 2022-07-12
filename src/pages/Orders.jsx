import { useEffect, useState } from 'react'
import axios from 'axios'

import Card from '../components/Card'
import Info from '../components/Info'

const delay = (millisec) => new Promise((resolve) => setTimeout(resolve, millisec))

function Orders() {
  const [isLoading, setIsLoading] = useState(true)
  const [orderItems, setOrderItems] = useState([])
  const [checkOrdersCount, setCheckOrdersCount] = useState(0)

  const deleteOrders = async () => {
    try {
      setOrderItems([])

      for (let i = 0; i < checkOrdersCount; i++) {
        await axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/orders/${i+1}`)
        await delay(1000)
      }
    } catch(error) {
      alert('Не удалось удалить заказы')
      console.error(error)
    }
  }
  
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('https://62bdaa89bac21839b6089ab1.mockapi.io/orders')
        setOrderItems(data.reduce((prev, order) => [...prev, ...order.items], []))
        setCheckOrdersCount(data.length)
        setIsLoading(false)

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
        {Boolean(orderItems.length) &&
          <div >
            <button className="button-delete" onClick={deleteOrders}>
              Удалить заказы
            </button>
          </div>
        }
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