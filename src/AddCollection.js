import React from 'react';

class AddCollection extends React.Component {
    state = {
      newcollection: '' ,
      showing: false
    }
    render() {
        let formClassName = "popup__addnew-form"
        if (this.state.showing) {
            formClassName += ' popup__addnew-form--visible'
        }
        return (
            <div className="popup__addnew" >
                <span className="popup__addnew-plus" onClick={this.showAddNewInput} >+</span>
                <form className={ formClassName }  onSubmit={event => event.preventDefault()}>
                    <input type="text" onChange={this.setNewCollectionName} className="popup__addnew-input" ></input>
                    <button className="popup__addnew-button"  onClick={() => this.props.addNewCollection(this.state.newcollection) } >ADD NEW COLLECTION</button>
                </form>
            </div>
        )
    }
    showAddNewInput = () => {
        this.setState({showing: !this.state.showing})
    }
    setNewCollectionName = (event) => {
        this.setState({ newcollection: event.target.value })
    }
}


export default AddCollection