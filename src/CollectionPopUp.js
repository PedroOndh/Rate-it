import React from 'react';

import APIContext from './APIContext';

import './css/Popup.css';

import PreviousCollections from './PreviousCollections';
import AddCollection from './AddCollection';

class CollectionPopUp extends React.Component {
    render() {
        return (
        <APIContext.Consumer>
            {
            ({ closePopup, removeCollection, addNewCollection, addToCollection, collections, currentMovie }) => 
                <div className="popup">
                    <span className="popup__close-button" onClick={closePopup} >×</span>
                    <div className="popup__text">Select a collection for <strong>{currentMovie.title}</strong></div>
                    <PreviousCollections collections={collections} removeCollection={removeCollection} />
                    <AddCollection addNewCollection={addNewCollection}/>
                    <button className="popup__button" onClick={addToCollection}>ADD TO COLLECTION</button>
                </div>
            }
        </APIContext.Consumer>    
        );
    }
}

export default CollectionPopUp;