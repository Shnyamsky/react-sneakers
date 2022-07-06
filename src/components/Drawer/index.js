import styles from './Drawer.module.scss'

function Drawer({ onCloseClick, onRemove, cartItems = [] }) {
  return(
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="cu-p"
            onClick={onCloseClick}
            src="/img/btn-remove.svg"
            alt="Close" />
        </h2>

        {
          cartItems.length > 0 ? (
            <div>
              <div className={styles.items}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className={styles.cartItemImg}></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{Math.floor(item.price / 1000)} {item.price % 1000} руб.</b>
                    </div>
                    <img
                      className={styles.removeBtn}
                      onClick={() => onRemove(item.id)}
                      src="/img/btn-remove.svg"
                      alt="Remove" />
                  </div>
                ))}
              </div>

              {/* Посмотреть расширение ul>li*2>span+div+b */}
              <div className={styles.cartTotalBlock}>
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1 074 руб.</b>
                  </li>
                </ul>

                <button className={styles.greenButton}>
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.cartEmpty}>
              <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="Empty"/>
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя-бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={onCloseClick} className={styles.greenButton}>
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
          )
        }

      </div>
    </div>
  )}

export default Drawer