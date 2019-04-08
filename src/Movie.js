import React from 'react';
import { Link } from 'react-router-dom';


class Movie extends React.Component {
    render() {
        return (
                <article className="movie" key={this.props.details} >
                    <Link to={`/${this.props.details.id}`}>
                    <img className="movie__image" src={`https://image.tmdb.org/t/p/w500/${this.props.details.poster_path}`} alt={this.props.details.title} />
                    <h2 className="movie__title">
                        {this.props.details.title}
                    </h2>
                    </Link>
                    <div className="movie__rating">
                        {this.props.details.vote_average}
                    </div>
                    {
                        this.props.children
                    }
                </article>
        );
    }
}

export default Movie;