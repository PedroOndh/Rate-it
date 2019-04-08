import React from 'react';

class AddCollection extends React.Component {
    state = { newcollection: '' }
    render() {
        return (
            <div className="popup__addnew" >
                <span className="popup__addnew-plus" onClick={this.showAddNewInput} >+</span>
                <form className="popup__addnew-form"  onSubmit={event => event.preventDefault()}>
                    <input type="text" onChange={this.setNewCollectionName} className="popup__addnew-input" ></input>
                    <button className="popup__addnew-button"  onClick={() => this.props.addNewCollection(this.state.newcollection) } >ADD NEW COLLECTION</button>
                </form>
            </div>
        )
    }
    showAddNewInput = () => {
        document.querySelector('.popup__addnew-form').classList.toggle('popup__addnew-form--visible');
    }
    setNewCollectionName = (event) => {
        this.setState({ newcollection: event.target.value })
    }
}


export default AddCollection