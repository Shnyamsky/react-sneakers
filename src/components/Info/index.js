import { useContext } from 'react'
import AppContext from '../../context'

import styles from './Info.module.scss'

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext) 

  return (
    <div className={styles.cartEmpty}>
      <img className="mb-20" width={120} src={image} alt="Empty"/>
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info