import styles from './Card.module.scss'

function Card(props) {
  return(
    <div className={styles.card}>
      <div className={styles.favourite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{Math.floor(props.price / 1000)} {Math.floor(props.price % 1000)} руб.</b>
        </div>
        <button className={styles.button} onClick={props.onClick}>
          <img width={12} height={12} src="/img/plus.svg" alt="Plus"/>
        </button>
      </div>
    </div>
  )}

export default Card