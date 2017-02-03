import React from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

var Tags = React.createClass({
  getInitialState: function(){
    return {tags:[]};
  },
  componentDidMount(){
    this.setTags();
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
    editTag: function(index){
    browserHistory.push(`tag/form/${index}`);   
  },
  deleteTag: function(id){
    let tags = this.state.tags;    
    let channels = JSON.parse(localStorage.channels);
    channels = channels.map(channel => {
      let index = channel.tags.indexOf(tags[id]);
      if(index !== -1) channel.tags.splice(index, 1);
      return channel;
    });
    localStorage.channels = JSON.stringify(channels);
    
    tags.splice(id, 1);
    localStorage.tags = JSON.stringify(tags);
    
    this.setTags();
  },
  render: function(){
    var result = (
    <h4>No tags to show. Add some tags!</h4>
    );
    if(this.state.tags.length > 0){         
    var tags = this.state.tags.map((tag, index) => {
      return(
        <tr id={index} data-tagname={tag}  key={index}>
          <td>          
          {tag}
          </td>
          <td>
            <Link to={"/channels/tag/" + tag} data-toggle="tooltip" title="View channels" data-placement="top" className="btn btn-default">
              <span className="glyphicon glyphicon-list" aria-hidden="true"></span></Link>
            
            <button data-toggle="tooltip" title="Edit tag" onClick={this.editTag.bind(this, index)}  type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
</button>
          <button data-toggle="tooltip" title="Delete tag" onClick={this.deleteTag.bind(this, index)}  type="button" className="btn btn-default">
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
    return(
      <div>
          <h3>Tags</h3> <Link to="/tag/form" className="btn btn-default">Add Tag</Link>
        <hr/>
      {result}      
           
        </div>
    );
  }
});

export default Tags;