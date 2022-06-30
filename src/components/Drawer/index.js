import styles from './Drawer.module.scss'

function Drawer({ onCloseClick, cartItems = []}) {
  return(
    <div
      // style={{ display: 'none' }}
      className={styles.overlay}
    >
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="cu-p"
            onClick={onCloseClick}
            src="/img/btn-remove.svg"
            alt="Close" />
        </h2>

        <div className={styles.items}>
          {cartItems.map((item) => (
            <div className={styles.cartItem}>
              <div
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                className={styles.cartItemImg}></div>

              <div className="mr-20 flex">
                <p className="mb-5">{item.title}</p>
                <b>{Math.floor(item.price / 1000)} {item.price % 1000} руб.</b>
              </div>
              <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
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
    </div>
  )}

export default Drawer