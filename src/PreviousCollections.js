import React from 'react';

class PreviousCollections extends React.Component {
    render() {
        var collectionTitles = Object.keys(this.props.collections);
        return (
            <ul className="popup__collections" >
            {
                collectionTitles &&
                collectionTitles.map(collection =>
                  <li key={collection} title={collection} className='popup__collection-element' onClick={(event) => this.selectCollection(event)}>
                    <p className="popup__collection-name">{collection}</p>
                    <span className="popup__collection-delete" onClick={() => this.props.removeCollection(collection)}>×</span>
                  </li>
                )
            }
            </ul>
        )
    }
    selectCollection = event => {
        const popupCollectionElements = document.querySelectorAll('.popup__collection-element');
        for (let i = 0; i < popupCollectionElements.length; i++) {
            popupCollectionElements[i].classList.remove('popup__collection-element--selected');
        }
        event.currentTarget.classList.add('popup__collection-element--selected');
    }
}

export default PreviousCollections;