import { Link } from 'react-router-dom'
import { useContext } from 'react'

import AppContext from '../../context'

import styles from './Info.module.scss'

const Info = ({ title, description, image, setIsOrderComplite, isPage }) => {
  const { setCartOpened } = useContext(AppContext) 

  return (
    <div className={styles.cartEmpty}>
      <img className="mb-20" width={120} src={image} alt="Empty"/>
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      {isPage ? (
        <Link to="/">
          <button className={styles.greenButton}>
            <img src="/img/arrow.svg" alt="Arrow" />
            Выбрать кроссовки
          </button>
        </Link>
      ) : (
        <button onClick={() => {setCartOpened(false); setIsOrderComplite(false)}} className={styles.greenButton}>
          <img src="/img/arrow.svg" alt="Arrow" />
          Вернуться назад
        </button>
      )}
    </div>
  )
}

export default Info