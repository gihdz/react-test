import React from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import {Tooltip, OverlayTrigger, ButtonToolbar, Button, Glyphicon} from "react-bootstrap"

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
      let viewChannelOverlay = <Tooltip id="viewTooltip"><strong>View channels</strong></Tooltip>;
      let editOverlay = <Tooltip id="editTooltip"><strong>Edit Tag</strong></Tooltip>;
      let deleteOverlay = <Tooltip id="deleteTooltip"><strong>Delete Tag</strong></Tooltip>;
      return(
        <tr id={index} data-tagname={tag}  key={index}>
          <td>          
          {tag}
          </td>
          <td>
                 <ButtonToolbar>
                    <OverlayTrigger placement="top" overlay={viewChannelOverlay}>
      <Link to={"/channels/tag/" + tag} className="btn btn-default">
              <Glyphicon glyph="list"/></Link>
    </OverlayTrigger>
    <OverlayTrigger placement="top" overlay={editOverlay}>
      <Button bsStyle="default"  onClick={this.editTag.bind(this, index)}><Glyphicon glyph="edit" /></Button>
    </OverlayTrigger>

    <OverlayTrigger placement="top" overlay={deleteOverlay}>
      <Button bsStyle="default" onClick={this.deleteTag.bind(this, index)}><Glyphicon glyph="remove" /></Button>
    </OverlayTrigger>
  </ButtonToolbar>   
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