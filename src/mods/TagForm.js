import React from 'react';
import ModalFormTemplate from './ModalFormTemplate'

var TagForm = React.createClass({
  getInitialState: function(){
    return {tagName:""};
  },
  handleNameChange: function(e){
    this.setState({tagName: e.target.value});
  },
  handleSubmit: function(e){
    var tagName = this.state.tagName;
    this.setState({tagName: ""});
    this.props.handleFormSubmit(tagName);
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({tagName: nextProps.tag});
  },
  componentDidMount:function(){
    // $('#form-modal').on('shown.bs.modal', function () {
    //   $("#inputTagName").focus();
    // });
  },
  render: function(){
    var fields = (<div className="form-group">
    <label htmlFor="inputTagName">Tag Name</label>
    <input required="required" type="text" className="form-control" id="inputTagName" value={this.state.tagName} onChange={this.handleNameChange}/>
  </div>)
    return(
       <ModalFormTemplate fields= {fields} actionText = {this.props.actionText} handleSubmit={this.handleSubmit}/>
    
    )
  }});

  export default TagForm;