import React from 'react';

import './css/Search.css';

class Search extends React.Component {
    state = { search: '' };
    render() {
        return (
            <li className='menu__search'>
                <form className="menu__search-form"  onSubmit={event => event.preventDefault()}>
                    <input type="text" onChange={this.setNewSearch} className="menu__search-input" ></input>
                    <button className="menu__search-button" onClick={() => this.props.searchMovie(this.state.search)}>SEARCH</button>
                </form>
            </li>
        )
    }
    setNewSearch = (event) => {
        this.setState({ search: event.target.value })
    }
}

export default Search