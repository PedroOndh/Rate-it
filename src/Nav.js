import React from 'react'
import { NavLink } from 'react-router-dom'

import './css/Nav.css'

export default props =>
  <nav className='menu'>
    <ul className='menu__options'>
      <li className='app__name'>
        Rate-it
      </li>
      <li className='menu__option'>
        <NavLink exact activeClassName='menu__link--active' className='menu__link' to='/'>Home</NavLink>
      </li>
      <li className='menu__option'>
        <NavLink activeClassName='menu__link--active' className='menu__link' to='/collections'>Collections</NavLink>
      </li>
    </ul>
  </nav>
