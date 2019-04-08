
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
              { collections[0] ?
              (
                collections.map(collection =>
                    <div className="collection" key={`${collection.title}`}>
                        <h2 className="collection__title">{collection.title}</h2>
                        { collection.films[0] ? 
                        ( 
                          <Showcase items={collection.films} render={movie =>
                              <Movie details={movie} >
                              <RateMovie movie={movie.id} collection={collection.title} fn={rateMovie} rating={collection.ratings[movie.id]} />
                              <button className="movie__button" onClick={() => removeFromCollection(collection.title, movie.id)} >ELIMINAR DE LA COLECCIÓN</button>
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