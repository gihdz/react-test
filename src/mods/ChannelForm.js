import React from 'react';
import ModalFormTemplate from './ModalFormTemplate'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { browserHistory } from 'react-router'

var ChannelForm = React.createClass({
  getInitialState: function(){
    return {channelName:"", channelUrl:"", channelTags: []};
  },
  handleTagsChange: function(e){
    var tags = e.map(function(tag){
      return tag.value;
    });
    this.setState({channelTags: tags});
  },
  handleSubmit: function(e){
    e.preventDefault();   
    if(!this.state.channelName || !this.state.channelUrl || this.state.channelTags.length === 0) return;
    let channels = JSON.parse(localStorage.channels);
    let channel = {name: this.inputChannel.value.trim(), url: this.inputUrl.value.trim(), tags: this.state.channelTags};
    if(this.props.params.id >= 0)
      channels[this.props.params.id] = channel
      else channels.push(channel);
    localStorage.channels = JSON.stringify(channels);
    browserHistory.push("/channels");
  },
  componentDidMount:function(){
    this.inputChannel.focus();    
    let channelName = "";
    let channelUrl = "";
    let channelTags = [];
    
    if(this.props.params.id >= 0){
      let channel = JSON.parse(localStorage.channels)[this.props.params.id];
      channelName = channel.name;
      channelUrl = channel.url;
      channelTags = channel.tags;
    }
    this.setState({channelName, channelUrl, channelTags});
  },
  handleChange(input){
    // let change = {};
    let value = input.target.value;
    switch(input.target){
      case this.inputChannel:
      this.setState({channelName: value});
      break;
      case this.inputUrl:
      this.setState({channelUrl: value});
      break;
      default:
      break;
    }

    // this.setState({change})
    // if(input.target == this.inputChannel) console.log("lile");

  },
  render: function(){
     let tags = [];    
   if(localStorage.tags)
    tags = JSON.parse(localStorage.tags).map(function(tag, index){return {value: tag, label: tag};});
    return(
      <form onSubmit={this.handleSubmit}> 
      <div className="form-group">
    <label htmlFor="inputChannelName">Channel Name</label>
    <input type="text" className="form-control" id="inputChannelName" value={this.state.channelName} ref={input => this.inputChannel = input} onChange={this.handleChange} />
  </div>
      <div className="form-group">
    <label htmlFor="inputChannelUrl">Channel Url</label>
    <input type="text" className="form-control" id="inputChannelUrl" value={this.state.channelUrl} onChange={this.handleChange}  ref={input => this.inputUrl = input}/>
  </div>
        <div className="form-group">
    <label htmlFor="inputChannelTags">Channel Tags</label>
          <Select multi={true} name="inputChannelTags" value={this.state.channelTags} options={tags} onChange={this.handleTagsChange}  />
   
  </div>
  <button type="submit" className="btn btn-default" >Save</button>
      </form>
    
    )
  }});

  export default ChannelForm;