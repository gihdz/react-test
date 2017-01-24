import React from 'react';
var ModalFormTemplate = React.createClass({
  handleSubmit: function(e){
    // e.preventDefault();
    // $('#form-modal').modal('hide');
    // this.props.handleSubmit();
  },
  render: function(){
    return(
   <div className="modal fade" id="form-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">{this.props.actionText}</h4>
      </div>
      <form id="recipe-form" onSubmit={this.handleSubmit}>
      <div className="modal-body">
        
     {this.props.fields}            
              
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">{this.props.actionText}</button>
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>        
      </div>
      </form>
    </div>
  </div>
</div>
    )
  }
});

export default ModalFormTemplate;