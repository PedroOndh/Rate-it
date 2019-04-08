import React from 'react';
import CollectionPopUp from './CollectionPopUp';
import APIContext from './APIContext';
import RateMovie from './RateMovie';

import './css/Single.css';

class Single extends React.Component {
    state = {movie: []};
    async componentDidMount() {
        try{
            const query = `movie/${this.props.movieid}?`;
            const data = await this.props.findMovies(query);
            this.setState({movie: data});
        }catch(e){
            console.error(e);
        }
    }
    render() {
        return (
        <APIContext.Consumer>
            {
            ({ activatePopup, rateMovie, ratings }) => 
        <>
          <CollectionPopUp />
          <article className="single"> 
            <div className="single__image">
                <img className="movie__image" src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt={this.state.movie.title} />
            </div>
            <div className="single__content">
                <h2 className="movie__title">
                    {this.state.movie.title}
                </h2>
                <div className="single__text" >
                    <RateMovie movie={this.state.movie.id}  fn={rateMovie} rating={ratings[this.state.movie.id]} />
                    <div className="single__information">
                        <span>Puntuación:<p>{this.state.movie.vote_average}</p></span>
                        <span>Estreno: <p>{this.state.movie.release_date}</p></span>
                        <span>Duracion: <p>{this.state.movie.runtime} min.</p></span>
                    </div>
                    <div className="single__synopsis">
                        <span><p>{this.state.movie.overview}</p></span>
                    </div>
                    <button className="single__button" onClick={() => activatePopup(this.state.movie)} >ADD TO A COLLECTION</button>
                </div>
            </div>
          </article>
        </>
            }
        </ APIContext.Consumer>
        );
    }
}

export default Single;