import React, { Component } from 'react';
import './css/Reset.css';
import './css/App.css';

import APIContext from './APIContext';
import Routes from './Routes';
import Nav from './Nav';

class RateIt extends Component {
  state = {
    ratings: JSON.parse(localStorage.getItem('ratings')) || [],
    collections: JSON.parse(localStorage.getItem('collections')) || [],
    currentMovie: []
  }
  render() {
    return (
    <APIContext.Provider value={{
        findMovies: this.findMovies,
        collections: this.state.collections,
        ratings: this.state.ratings,
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
  activatePopup = movie => {
      let popup = document.querySelector('.popup');
      popup.classList.add('popup--visible');
      this.setState({currentMovie: movie});
  }
  closePopup = () => {
    document.querySelector('.popup').classList.remove('popup--visible');
  }
  addNewCollection = async (newCollection) => {
    if(newCollection){
      const previousState = this.state;
      const newCollectionLowerCase = newCollection.toLowerCase();
      const alreadyExist = previousState.collections.find(collection => 
        collection.title === newCollectionLowerCase
      );
      if(!alreadyExist){
        const nextState = {
          ...previousState,
            collections: [
                ...previousState.collections,
                {
                    title: newCollectionLowerCase,
                    films: []
                }
            ]
        };
  
        await this.setState(nextState);
        
          localStorage.setItem(
            'collections',
            JSON.stringify(this.state.collections)
          ) 
      }
    }
  }
  removeCollection = async (collectionTitle) => {
    const previousState = this.state;
    const collectionsToNotUpdate = previousState.collections.filter(collection => 
        collection.title !== collectionTitle
    );
    const nextState = {
        ...previousState,
        collections: [
            ...collectionsToNotUpdate
        ]
    };

    await this.setState(nextState);

    localStorage.setItem(
        'collections',
        JSON.stringify(this.state.collections)
      ) 
  }
  addToCollection = async () => {
        
    const collectionForTheMovie = document.querySelector('.popup__collection-element--selected p');
    if (collectionForTheMovie){
        
        const collectionTitle = collectionForTheMovie.innerHTML;
        const currentMovie = this.state.currentMovie;
        const previousState = this.state;
        
        const collectionToUpdate = previousState.collections.find(collection =>
            collection.title === collectionTitle
        );
        const collectionsToNotUpdate = previousState.collections.filter(collection => 
            collection.title !== collectionTitle
        );
        const otherMovies = collectionToUpdate.films.filter(film =>
            film.id !== currentMovie.id
        );
        const nextState = {
            ...previousState,
            collections: [
                ...collectionsToNotUpdate,
                {
                    title: collectionToUpdate.title,
                    films: [
                        ...otherMovies,
                        currentMovie
                    ]
                }
            ]
        };

        await this.setState(nextState);
        
        localStorage.setItem(
            'collections',
            JSON.stringify(this.state.collections)
        ) 

        this.setState({ currentMovie: [] })

        this.closePopup();
    }
  }
  removeFromCollection = async (collectionTitle, movieID) => {
    const previousState = this.state;
    const collectionToUpdate = previousState.collections.find(collection =>
        collection.title === collectionTitle
    );
    const collectionsToNotUpdate = previousState.collections.filter(collection => 
        collection.title !== collectionTitle
    );
    const collectionWithoutTheFilm = collectionToUpdate['films'].filter(movie => 
        movie.id !== movieID
    );
    const nextState = {
        ...previousState,
        collections: [
            ...collectionsToNotUpdate,
            {
                title: collectionToUpdate.title,
                films: [
                    ...collectionWithoutTheFilm
                ]
            }
        ]
    };

    await this.setState(nextState);
    
      localStorage.setItem(
        'collections',
        JSON.stringify(this.state.collections)
      ) 
  }
  rateMovie = async (movieID, rating) => {
    const previousState = this.state;
    const nextState = {
      ...previousState,
      ratings: {
        ...previousState.ratings,
        [movieID]: rating
      }
    }
    
    await this.setState(nextState);
  
    localStorage.setItem(
      'ratings',
       JSON.stringify(this.state.ratings)
    );
  }

}

export default RateIt;
