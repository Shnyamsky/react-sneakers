import { Link } from 'react-router-dom'

import { useCart } from '../../hooks/useCart'

import styles from './Header.module.scss'

function Header(props) {
  const { totalPrice } = useCart()

  return(
    <header className={styles.header}>
      <Link to="/">
        <div className="d-flex align-center">
          <img className="mr-15" width="40px" height="40px" src="/img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li 
          className="mr-30 cu-p"
          onClick={props.onCartClick}
        >
          <img className="mr-10" width={20} height={20} src="/img/cart.svg" alt="Cart"/>
          <span>{totalPrice} руб.</span>
          {/* <b>{totalPrice} руб.</b> */}
        </li>
        <li
          className="mr-30"
          onClick={props.onFavClick}
        >
          <Link to="/favorites">
            <img width={20} height={20} src="/img/like.svg" alt="Favorites"/>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={20} height={20} src="/img/user.svg" alt="User"/>
            </Link>
        </li>
      </ul>
    </header>
  )}

export default Header