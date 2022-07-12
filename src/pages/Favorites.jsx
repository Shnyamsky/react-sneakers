import { useContext } from 'react'
import AppContext from '../context'

import Card from '../components/Card'
import Info from '../components/Info'

function Favorites() {
  const {favItems, onCart, onFavorite, isLoading} = useContext(AppContext)
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="items-grid">
        {(isLoading ? Array(4).fill({}) : favItems)
        .map((item) => (
          <Card
            key={item.itemId}
            {...item}
            onPlusClick={onCart}
            onFavClick={onFavorite}
            loading={isLoading}
          />
        ))}
      </div>
      {(!favItems.length && !isLoading) &&
        <Info 
        title={"Закладок нет :("}
        description={`Вы ничего не добавляли в закладки`}
        image={"/img/emoji-favorites.png"}
        isPage
      />
      }
    </div>
  )}

export default Favorites