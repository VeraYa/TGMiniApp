import React from 'react'
import './routes.css'

export default function Routes() {
  return (
    <div id="sidebar">
      <nav>
        <ul>
          <li>
            <a className='link' href={`/chat`}>Чат</a>
          </li>
          <li>
            <a className='link' href={`/currency`}>Курсы валют</a>
          </li>
          <li>
            <a className='link' href={`/moredata`}>Товары</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
