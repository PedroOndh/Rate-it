import React from 'react';

const Showcase = props =>
<ul className='showcase'>
  {
    props.items.map(item =>
      <li className='showcase__movie' key={item.id} >
        {props.render(item)}
      </li>
    )
  }
</ul>

export default Showcase;