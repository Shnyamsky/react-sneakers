import { useState } from 'react'

import styles from './Slider.module.scss'

const Slider = () => {

  const slides = [
    {image:"/img/slider/slider-1.jpg"},
    {image:"/img/slider/slider-2.jpg"}
  ]

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }
  
  const [current, setCurrent] = useState(0)
  const length = slides.length

  if(!Array.isArray(slides) || slides.length <= 0) {
    return null
  }

  return (
    <section className={styles.sliderItems}>
      <img
        className={styles.arrowLeft}
        onClick={prevSlide}
        src="/img/slider/arrow.svg"
        alt="Left"
      />
      <img
        className={styles.arrowRight}
        onClick={nextSlide}
        src="/img/slider/arrow.svg"
        alt="Right"
      />
      {slides.map((slide, index) => {
        return (
          <div className={index === current ? styles.active : styles.inactive} key={index}>
            {index === current && <img className={styles.slideImg} src={slide.image} alt="Slide" />}
          </div>
        )
      })}
    </section>
  )
}

export default Slider