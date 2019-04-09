
import React from 'react';

import APIContext from './APIContext';

import Movie from './Movie';
import Showcase from './Showcase';
import RateMovie from './RateMovie';

class CollectionShowcase extends React.Component {
    render () {
      return (
        <APIContext.Consumer>
          {
            ({ removeFromCollection, rateMovie, collections }) =>
            <div className="collections__wrapper">
              { Object.keys(collections).length ?
              (
                Object.keys(collections).map(key =>
                    <div className="collection" key={`${collections[key].title}`}>
                        <h2 className="collection__title">{collections[key].title}</h2>
                        { collections[key].films[0] ? 
                        ( 
                          <Showcase items={collections[key].films} render={movie =>
                              <Movie details={movie} >
                              <RateMovie movie={movie.id} collection={collections[key].title} fn={rateMovie} rating={collections[key].ratings[movie.id]} />
                              <button className="movie__button" onClick={() => removeFromCollection(collections[key].title, movie.id)} >ELIMINAR DE LA COLECCIÓN</button>
                              </Movie>
                          } />
                        ):
                        (
                          <p className="no-found">There is no films in this collection</p>
                        ) }
                    </div>
                )
              ): 
              (
                <p className="no-found">There is no collections, try to add a collection clicking on the "Add to a collection" button at Home</p>
              ) }
            </div>
          }
        </APIContext.Consumer>
      )
    }
  }

export default CollectionShowcase;