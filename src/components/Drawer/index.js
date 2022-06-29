import styles from './Drawer.module.scss'

function Drawer(){
  return(
    <div
      style={{ display: 'none' }}
      className={styles.overlay}
    >
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        <div className={styles.items}>
          <div className={styles.cartItem}>
            <div
              style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }}
              className={styles.cartItemImg}></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
          </div>

          <div className={styles.cartItem}>
            <div
              style={{ backgroundImage: 'url(/img/sneakers/3.jpg)' }}
              className={styles.cartItemImg}></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>8 499 руб.</b>
            </div>
            <img className={styles.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
          </div>
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