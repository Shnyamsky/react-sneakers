import { useState, useContext } from 'react'
import axios from 'axios'

import Info from '../Info'
import AppContext from '../../context'
import { useCart } from '../../hooks/useCart'

import styles from './Drawer.module.scss'

const delay = (millisec) => new Promise((resolve) => setTimeout(resolve, millisec))

function Drawer() {
  const { onCart, cartOpened, setCartOpened } = useContext(AppContext)
  const { cartItems, setCartItems, totalPrice } = useCart()
  
  const [orderId, setIsOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post('https://62bdaa89bac21839b6089ab1.mockapi.io/orders', {items: cartItems})
      setIsOrderId(data.id)
      setCartItems([])
      setIsOrderComplite(true)

      // bad practice
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(`https://62bdaa89bac21839b6089ab1.mockapi.io/cart/${item.id}`)
        await delay(1000)
      }
    } catch(error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false)
  }

  return(
    // <div className={styles.overlay}>
    <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="cu-p"
            onClick={() => setCartOpened(false)}
            src="/img/btn-remove.svg"
            alt="Close" />
        </h2>

        {
          cartItems.length > 0 ? (
            <>
              <div className={styles.items}>
                {cartItems.map((item) => (
                  <div key={item.itemId} className={styles.cartItem}>
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className={styles.cartItemImg}></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{Math.floor(item.price / 1000)} {item.price % 1000} руб.</b>
                    </div>
                    <img
                      className={styles.removeBtn}
                      onClick={() => onCart(item)}
                      src="/img/btn-remove.svg"
                      alt="Remove" />
                  </div>
                ))}
              </div>

              {/* Check extension ul>li*2>span+div+b */}
              <div className={styles.cartTotalBlock}>
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                  </li>
                </ul>

                <button disabled={isLoading} className={styles.greenButton} onClick={onClickOrder}>
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </>
          ) : (
            <Info 
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` 
                : "Добавьте хотя-бы одну пару кроссовок, чтобы сделать заказ"
              }
              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
            />
          )
        }

      </div>
    </div>
  )}

export default Drawer