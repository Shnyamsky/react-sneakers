import { useContext } from 'react'
import ContentLoader from 'react-content-loader'

import AppContext from '../../context'

import styles from './Card.module.scss'

function Card({ id, itemId, title, price, imageUrl, onPlusClick, onFavClick, loading = false }) {
  const { isCartItemAdded, isFavItemAdded } = useContext(AppContext)
  const itemData = { id, itemId, title, price, imageUrl }

  const handlePlusClick = () => {
    onPlusClick(itemData)
  }
  
  const handleFavClick = () => {
    onFavClick(itemData)
  }

  return(
    <div className={styles.card}>
      {loading ?
        <ContentLoader 
          speed={2}
          width={158}
          height={250}
          viewBox="0 0 158 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="158" height="140" /> 
          <rect x="0" y="160" rx="5" ry="5" width="158" height="15" /> 
          <rect x="0" y="180" rx="5" ry="5" width="110" height="15" /> 
          <rect x="0" y="225" rx="5" ry="5" width="80" height="25" /> 
          <rect x="126" y="218" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
        :
        <>
          {onFavClick && <div
            className={styles.favBtn}
            onClick={handleFavClick}
          >
            <img 
              width={32} height={32} 
              src={isFavItemAdded(itemId) 
              ? "/img/heart-liked.svg" 
              : "/img/heart-unliked.png"} 
              alt="Liked" 
            />
          </div>}
          <img width={158} height='100%' src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlusClick && <div
              className={styles.plusBtn}
              onClick={handlePlusClick}
            >
              <img 
                src={isCartItemAdded(itemId) 
                ? "/img/btn-checked.svg" 
                : "/img/btn-plus.svg"} 
                alt="Plus"
              />
            </div>}
          </div>
        </>
      }
    </div>
  )}

export default Card