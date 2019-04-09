import React, { Component } from 'react';
import './css/Reset.css';
import './css/App.css';

import APIContext from './APIContext';
import Routes from './Routes';
import Nav from './Nav';

class RateIt extends Component {
  state = {
    collections: JSON.parse(localStorage.getItem('collections')) || {},
    currentMovie: []
  }
  render() {
    return (
    <APIContext.Provider value={{
        findMovies: this.findMovies,
        collections: this.state.collections,
        currentMovie: this.state.currentMovie,
        activatePopup: this.activatePopup,
        closePopup: this.closePopup,
        addNewCollection: this.addNewCollection,
        removeCollection: this.removeCollection,
        addToCollection: this.addToCollection,
        removeFromCollection: this.removeFromCollection,
        rateMovie: this.rateMovie
    }}>
        <Nav />
        <Routes/>
    </APIContext.Provider>
    );
  }
  findMovies = async query => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/${query}api_key=70a4ecd9331c7553d29cdb79b61f6f1e`)
        const movies = await response.json()
        return movies
    }catch(error){
        console.error(error);
    }
  }
  saveCollections = (state) => {
    this.setState(state);
  
    localStorage.setItem(
      'collections',
      JSON.stringify(state.collections)
    ) 
  }
  activatePopup = movie => {
      let popup = document.querySelector('.popup');
      popup.classList.add('popup--visible');
      this.setState({currentMovie: movie});
  }
  closePopup = () => {
    document.querySelector('.popup').classList.remove('popup--visible');
  }
  addNewCollection = (newCollection) => {
    if(newCollection){
      const previousState = this.state;
      const newCollectionLowerCase = newCollection.toLowerCase();

      if(!previousState.collections[newCollectionLowerCase]){
        const nextState = {
          ...previousState,
            collections: {
                ...previousState.collections,
                [newCollectionLowerCase]: {
                    title: newCollectionLowerCase,
                    films: [],
                    ratings: {}
                }
              }
        };
  
        this.saveCollections(nextState);
      }
    }
  }
  removeCollection = (collectionTitle) => {
    const previousState = this.state;
    const previousCollections = previousState.collections;
    delete previousCollections[collectionTitle];

    const nextState = {
        ...previousState,
        collections: {
            ...previousCollections
        }
    };

    this.saveCollections(nextState);
  }
  addToCollection = () => {
        
    const collectionForTheMovie = document.querySelector('.popup__collection-element--selected p');
    if (collectionForTheMovie){
        
        const collectionTitle = collectionForTheMovie.innerHTML;
        const currentMovie = this.state.currentMovie;
        const previousState = this.state;
        
        const otherMovies = previousState.collections[collectionTitle].films.filter(film =>
            film.id !== currentMovie.id
        );
        const nextState = {
            ...previousState,
            collections: {
                ...previousState.collections,
                [collectionTitle]: {
                    title: previousState.collections[collectionTitle].title,
                    ratings: previousState.collections[collectionTitle].ratings,
                    films: [
                        ...otherMovies,
                        currentMovie
                    ]
                }
            }
        };

        this.saveCollections(nextState);

        this.setState({ currentMovie: [] })

        this.closePopup();
    }
  }
  removeFromCollection = (collectionTitle, movieID) => {
    const previousState = this.state;
    const collectionWithoutTheFilm = previousState.collections[collectionTitle].films.filter(movie => 
        movie.id !== movieID
    );
    const nextState = {
        ...previousState,
        collections: {
            ...previousState.collections,
            [collectionTitle]: {
                title: collectionTitle,
                ratings: previousState.collections[collectionTitle].ratings,
                films: [
                    ...collectionWithoutTheFilm
                ]
            }
        }
    };

    this.saveCollections(nextState);

  }
  rateMovie = (movieID, collectionTitle, rating) => {
    const previousState = this.state;

    const nextState = {
      ...previousState,
      collections: {
          ...previousState.collections,
          [collectionTitle]: {
              title: previousState.collections[collectionTitle].title,
              ratings: {
                  ...previousState.collections[collectionTitle].ratings,
                  [movieID]: rating
              },
              films: previousState.collections[collectionTitle].films
          }
      }
    };

    this.saveCollections(nextState);

  }

}

export default RateIt;
