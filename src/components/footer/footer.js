import React from 'react';
import './footer.css'


export default class Footer extends React.Component{

  state = {currentText : ''};

  onLabelChange = (e) => {
    this.setState({
      currentText : e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.currentText);
    this.setState({
      currentText : ''});
  }

  render(){
    return(
      <form className='item-add-form d-flex' onSubmit={this.onSubmit} >
        <input type='text' className='form-control add' onChange={this.onLabelChange}
        placeholder="What needs to be done" value={this.state.currentText} />
        <button type='button' className='btn btn-outline-primary add' onClick={this.onSubmit}>Add</button>
      </form>
    )
  }
}
