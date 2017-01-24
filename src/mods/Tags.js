import React from 'react';
import { Link } from 'react-router'
import TagForm from './TagForm'

var Tags = React.createClass({
  getInitialState: function(){
    return {tags:[],
           actionText: "Add Tag",
           selectedTag: null,
           formFunction: this.createTag};
  },
  setTags: function(){
    var tags = [];
    if(localStorage.tags) tags = JSON.parse(localStorage.tags);
    else{      
    tags = ["sports", "weather", "breaking", "people"];
    localStorage.tags = JSON.stringify(tags);
    }
    this.setState({tags: tags});
  },
 componentWillMount: function(){
   this.setTags();
   
  },
  showModalForm: function(){
    // $("#form-modal").modal("show");
  },
   addTag: function(e){
    this.setState({actionText:"Add Tag", selectedTag: null, formFunction: this.createTag}, this.showModalForm);
     
  },
  createTag: function(value){
    if(!value) return;     
    localStorage.tags = JSON.stringify(this.state.tags.concat(value));
    this.setTags();
  },
    editTag: function(e){
    // var trTag = $(e.target).closest("tr");
    //   trTag.removeData();
    // var id = trTag.attr("id");
    // var name = trTag.data("tagname");     
      
    // this.setState({actionText: "Edit Tag", selectedTag: {id:id, name: name}, formFunction: this.updateTag}, this.showModalForm);
    
  },
  updateTag: function(value){
    if(value){
      var prevTag = this.state.tags[this.state.selectedTag.id];
        this.state.tags[this.state.selectedTag.id] = value;

      var channels = JSON.parse(localStorage.channels);
      channels = channels.map(function(channel){
        if(channel.tags.indexOf(prevTag) != -1) channel.tags[channel.tags.indexOf(prevTag)] = value;
        return channel;

      });
      localStorage.channels = JSON.stringify(channels);
      localStorage.tags = JSON.stringify(this.state.tags);
      this.setTags();

      }
    this.setState({selectedTag: null});
     
    
  },
  deleteTag: function(e){
    // var id = $(e.target).closest("tr").attr("id");
    // var tags = this.state.tags;
    
    // var channels = JSON.parse(localStorage.channels);
    // channels = channels.map(function(channel){
    //   var index = channel.tags.indexOf(tags[id]);
    //   if(index != -1) channel.tags.splice(index, 1);
    //   return channel;
    // });
    // localStorage.channels = JSON.stringify(channels);
    
    // tags.splice(id, 1);
    // localStorage.tags = JSON.stringify(tags);
    
    // this.setTags();
  },
  

  componentDidMount: function(){
    this.assignTooltip();
  }, 
componentDidUpdate: function() {
  this.assignTooltip();
},
  assignTooltip: function(){
//  $('[data-toggle="tooltip"]').tooltip();    
  },
  render: function(){
    var self = this;
    var result = (
    <h4>No tags to show. Add some tags!</h4>
    );
    if(this.state.tags.length > 0){         
    var tags = this.state.tags.map(function(tag, index){
      return(
        <tr id={index} data-tagname={tag}  key={index}>
          <td>          
          {tag}
          </td>
          <td>
            <Link to={"/channels/" + tag} data-toggle="tooltip" title="View channels" data-placement="top" className="btn btn-default">
              <span className="glyphicon glyphicon-list" aria-hidden="true"></span></Link>
            
            <button data-toggle="tooltip" title="Edit tag" onClick={self.editTag}  type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
</button>
          <button data-toggle="tooltip" title="Delete tag" onClick={self.deleteTag}  type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
</button>
            
          </td>
        </tr>
      )
    });
      result=(
      <div>      
        <table className="table">
          <thead>
            <tr>
            <th>name</th>
            <th>actions</th>
            </tr>
          </thead>
          <tbody>
          {tags}
          </tbody>
        </table>
      </div>
      )
    }
    var tag = this.state.selectedTag ? this.state.selectedTag.name : "";
    return(
      <div>
          <h3>Tags</h3> <button className="btn btn-default" type="button" onClick={this.addTag}>Add Tag</button>
        <hr/>
      {result}        
             <TagForm tag={tag} actionText={this.state.actionText} handleFormSubmit={this.state.formFunction} />
        </div>
    );
  }
});

export default Tags;