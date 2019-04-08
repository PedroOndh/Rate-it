import React from 'react';

class RateMovie extends React.Component {
    render() {

        const items = [];

        for (let i = 1; i < 6; i++) {
            if (this.props.rating <= i) {
                items.unshift(<span key={`${this.props.movie}-${i}`} className="movie__star movie__star--active" onClick={() => this.props.fn(this.props.movie, i)} >★</span>)
            }else{
                items.unshift(<span key={`${this.props.movie}-${i}`} className="movie__star" onClick={() => this.props.fn(this.props.movie, i)} >★</span>)
            }
        }

        return (
            <div className="movie__ratings">
                {items}
            </div>
        )
    }
}

export default RateMovie;