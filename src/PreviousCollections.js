import React from 'react';

class PreviousCollections extends React.Component {
    render() {
        return (
            <ul className="popup__collections" >
            {
                this.props.collections &&
                this.props.collections.map(collection =>
                  <li key={collection.title} title={collection.title} className='popup__collection-element' onClick={(event) => this.selectCollection(event)}>
                    <p className="popup__collection-name">{collection.title}</p>
                    <span className="popup__collection-delete" onClick={() => this.props.removeCollection(collection.title)}>×</span>
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