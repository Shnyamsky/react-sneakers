import { useState } from 'react'
import styles from './Card.module.scss'

function Card({ title, price, imageUrl, onPlusClick, onFavClick }) {
  const [isAdded, setIsAdded] = useState(false)
  const [isFav, setIsFav] = useState(false)

  const handlePlusClick = () => {
    onPlusClick({ title, price, imageUrl })
    setIsAdded(!isAdded)
  }
  const handleFavClick = () => {
    onFavClick()
    setIsFav(!isFav)
  }

  return(
    <div className={styles.card}>
      <div
        className={styles.favBtn}
        onClick={handleFavClick}
      >
        <img src={isFav ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Liked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
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
          <img src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
        </div>
      </div>
    </div>
  )}

export default Card