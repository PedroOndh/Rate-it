import React from 'react';

import APIContext from './APIContext';
import Single from './Single';


class SingleMovie extends React.Component {
    render () {

      return (
        <APIContext.Consumer>
          {
            ({ findMovies }) =>
            <Single findMovies={findMovies} movieid={this.props.match.params.movieid} />
          }
        </APIContext.Consumer>
      )
    }
  }

export default SingleMovie;