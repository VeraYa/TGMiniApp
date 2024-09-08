import { Outlet } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function App() {
    // Инициализация Telegram WebApp SDK
    useEffect(() => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready(); // Сообщаем Telegram, что приложение готово к работе
      }
    }, []);

  return (
    <div className="App">
      <div id="sidebar">
        <nav>
          <ul className='list'>
            <li className='list-element'>
              <a className='link' href={`/chat`}>Чат</a>
            </li>
            <li className='list-element'>
              <a className='link' href={`/currency`}>Курсы валют</a>
            </li>
            <li className='list-element'>
              <a className='link' href={`/moredata`}>Товары</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
