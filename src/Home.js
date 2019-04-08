import React from 'react';

import APIContext from './APIContext';
import CollectionPopUp from './CollectionPopUp';
import HomeShowcase from './HomeShowcase';


class Home extends React.Component {

    render () {
      return (
        <APIContext.Consumer>
          {
            ({ findMovies }) => 
            <>
              <CollectionPopUp />
              <HomeShowcase findMovies={findMovies} />
            </>
          }
        </APIContext.Consumer>
      )
    }
  }

export default Home;