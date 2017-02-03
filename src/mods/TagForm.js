import React from 'react';
import {browserHistory} from "react-router"

var TagForm = React.createClass({  
  handleSubmit: function(e){
    e.preventDefault();
    if(!this.inputTag.value) return;
    let tags = JSON.parse(localStorage.tags);
    if(this.props.params.id >= 0){
      let prevTag = tags[this.props.params.id];
    tags[this.props.params.id] = this.inputTag.value;
    let channels = JSON.parse(localStorage.channels);
      channels = channels.map(channel => {
        if(channel.tags.indexOf(prevTag) !== -1) channel.tags[channel.tags.indexOf(prevTag)] = this.inputTag.value;
        return channel;
      });
      localStorage.channels = JSON.stringify(channels);
    }
    else tags.push(this.inputTag.value);
    localStorage.tags = JSON.stringify(tags);
    browserHistory.push("/tags");
  },
  componentDidMount(){
    this.inputTag.focus();
  },
  render: function(){
    let tag = "";
    if(this.props.params.id)
    tag = JSON.parse(localStorage.tags)[this.props.params.id];
    return(
      <div>
       <form onSubmit={this.handleSubmit}>
<div className="form-group">
    <label htmlFor="inputTagName">Tag Name</label>
    <input type="text" className="form-control" defaultValue={tag} ref={input => this.inputTag = input} />
    </div>
    <button type="submit" className="btn btn-default" >Save</button>

       </form>
    </div>
    )
  }});

  export default TagForm;