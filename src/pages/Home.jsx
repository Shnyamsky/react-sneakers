import { useContext } from 'react';
import AppContext from '../context';

import Card from '../components/Card'

function Home({ 
  searchValue,
  onChangeSearchInput,
  onClickClearBtn,
  isLoading
}) {
  const { items, onCart, onFavorite } = useContext(AppContext)

  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

    return (isLoading ? Array(10).fill({}) : filteredItems)
    .map((item) => (
      <Card
        key={item.itemId}
        {...item}
        // Check 2 ways
        onPlusClick={(itemData) => onCart(itemData)}
        onFavClick={onFavorite}
        loading={isLoading}
      />
  ))}

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
        {renderItems()}
      </div>
    </div>
  )}

export default Home