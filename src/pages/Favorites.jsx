import { useContext } from 'react'
import AppContext from '../context'

import Card from '../components/Card'

function Favorites({ isLoading }) {
  const {favItems, onFavorite} = useContext(AppContext)
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? Array(8).fill({}) : favItems)
        .map((item) => (
          <Card
            key={item.itemId}
            {...item}
            onFavClick={onFavorite}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  )}

export default Favorites