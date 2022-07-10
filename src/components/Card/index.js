import { useContext } from 'react'
import ContentLoader from 'react-content-loader'

import AppContext from '../../context'

import styles from './Card.module.scss'

function Card({ id, itemId, title, price, imageUrl, onPlusClick, onFavClick, loading = false }) {
  const { isCartItemAdded, isFavItemAdded } = useContext(AppContext)

  // console.log(title, isCartItemAdded(itemId))

  const handlePlusClick = () => {
    onPlusClick({ id, itemId, title, price, imageUrl })
  }
  
  const handleFavClick = () => {
    onFavClick({ id, itemId, title, price, imageUrl })
  }

  return(
    <div className={styles.card}>
      {loading ?
        <ContentLoader 
          speed={2}
          width={158}
          height={230}
          viewBox="0 0 158 230"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="158" height="130" /> 
          <rect x="0" y="145" rx="5" ry="5" width="158" height="15" /> 
          <rect x="0" y="165" rx="5" ry="5" width="110" height="15" /> 
          <rect x="0" y="200" rx="5" ry="5" width="80" height="25" /> 
          <rect x="126" y="193" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
        :
        <>
          <div
            className={styles.favBtn}
            onClick={handleFavClick}
          >
            <img src={isFavItemAdded(itemId) ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Liked" />
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          {/* <img width='100%' height={135} src={imageUrl} alt="Sneakers" /> */}
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{Math.floor(price / 1000)} {price % 1000} руб.</b>
            </div>
            <div
              className={styles.plusBtn}
              onClick={handlePlusClick}
            >
              <img src={isCartItemAdded(itemId) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
            </div>
          </div>
        </>
      }
    </div>
  )}

export default Card