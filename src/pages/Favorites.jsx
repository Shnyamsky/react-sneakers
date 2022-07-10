import { useContext } from 'react';
import AppContext from '../context';

import Card from '../components/Card'

function Favorites(/*{ onFavorite }*/) {
  const {favItems, onFavorite} = useContext(AppContext)
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favItems.map((item) => (
          <Card
            key={item.itemId}
            {...item}
            onFavClick={onFavorite}
          />
        ))}
      </div>
    </div>
  )}

export default Favorites