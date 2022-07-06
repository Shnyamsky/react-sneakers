import Card from '../components/Card'

function Home({ 
  items,
  onAddToCart,
  onFavorite,
  searchValue,
  onChangeSearchInput,
  onClickClearBtn,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue &&
            <img
              onClick={onClickClearBtn}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          }
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {/* Перевести filter и map в функцию */}
        {items
          .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={index}
              {...item}
              // Рассмотреть 2 способа
              onPlusClick={(itemData) => onAddToCart(itemData)}
              onFavClick={onFavorite}
            />
        ))}
      </div>
    </div>
  )}

export default Home