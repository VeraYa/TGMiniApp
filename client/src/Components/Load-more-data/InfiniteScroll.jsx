import React, { useState, useEffect } from 'react';
import './InfiniteScroll.css'

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=8&page=${page}`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      setItems(prevItems => [...prevItems, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className='scroll-container'>
      <ul className='scroll-list'>
        {items.map(item => (
          <li key={item.id} className='scroll-item'> 
            <h3 className='scroll-title'>{item.title}</h3>
            <p>{item.price} USD</p>
            <img src={item.image} alt={item.title} width="100" height="130" />
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <button onClick={handleLoadMore} disabled={loading} className='main-btn'>
          {loading ? 'Загрузка...' : 'Показать еще'}
        </button>
      )}
    </div>
  );
};

export default InfiniteScroll;