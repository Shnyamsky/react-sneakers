import Card from '../components/Card'

function Favorites({ items, onFavorite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((item, index) => (
          <Card
            key={index}
            {...item}
            favorited={true}
            onFavClick={onFavorite}
          />
        ))}
      </div>
    </div>
  )}

export default Favorites