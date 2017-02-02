import React from 'react';
var ModalFormTemplate = React.createClass({
  handleSubmit: function(e){
    // e.preventDefault();
    // $('#form-modal').modal('hide');
    // this.props.handleSubmit();
  },
  render: function(){
    return(
<div>
      <div className="modal-header">
        
        <h4 className="modal-title" id="myModalLabel">{this.props.actionText}</h4>
      </div>
      <form id="recipe-form" onSubmit={this.handleSubmit}>
      <div className="modal-body">
        
     {this.props.fields}            
              
      </div>
    
        <button type="submit" className="btn btn-primary">{this.props.actionText}</button>
       
      </form>
   </div>
    )
  }
});

export default ModalFormTemplate;