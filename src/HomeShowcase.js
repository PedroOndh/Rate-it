import React from 'react';

import APIContext from './APIContext';
import Search from './Search';
import Movie from './Movie';
import Showcase from './Showcase';


class HomeShowcase extends React.Component {
    state = { movies: [], search: '' };
    async componentDidMount() {
        try{
            const data = await this.props.findMovies('discover/movie?sort_by=popularity.desc&');
            const {results} = data;
            this.setState({movies: results});
        }catch(e){
            console.error(e);
        }
    }
    render () {
      return (
        <>
        <Search searchMovie={this.searchMovie}/>
        <APIContext.Consumer>
            {
            ({ activatePopup }) => 
            this.state.movies[0] ? (
              <Showcase items={this.state.movies} render={movie =>
                <Movie details={movie} >
                  <button className="movie__button" onClick={() => activatePopup(movie)} >ADD TO A COLLECTION</button>
                </Movie>
              } />
            ):
            (
              <p className="no-found">No movies were found</p>
            )
            }
        </APIContext.Consumer>
        </>
      )
    }
    searchMovie = async query => {
      try{
        const queryString = `search/movie?query=${query}&`;
        const data = await this.props.findMovies(queryString);
        const {results} = data;
        await this.setState({movies: results || []});
      }catch(e){
          console.error(e);
      }
    }
  }

export default HomeShowcase;