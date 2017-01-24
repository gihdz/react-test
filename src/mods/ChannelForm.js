import React from 'react';
import ModalFormTemplate from './ModalFormTemplate'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var ChannelForm = React.createClass({
  getInitialState: function(){
    return {channelName:"", channelUrl:"", channelTags: []};
  },
  handleNameChange: function(e){
    this.setState({channelName: e.target.value});
  },
  handleUrlChange: function(e){    
    this.setState({channelUrl: e.target.value});
  },
  handleTagsChange: function(e){
    var tags = e.map(function(tag){
      return tag.value;
    });
    this.setState({channelTags: tags});
  },
  handleSubmit: function(){
    var channel = {name: this.state.channelName.trim(), url: this.state.channelUrl.trim(), tags: this.state.channelTags};
    this.setState({channelName: "", channelUrl: "", channelTags: []});
     this.props.handleFormSubmit(channel);
  },
  componentWillReceiveProps: function(nextProps){
    
    if(nextProps.channel)
      this.setState({channelName: nextProps.channel.name, channelUrl: nextProps.channel.url, channelTags: nextProps.channel.tags});
  },
  componentDidMount:function(){
    // $('#form-modal').on('shown.bs.modal', function () {
    //   $("#inputChannelName").focus();
    // });
  },
  render: function(){
    var tags = [];
    if(localStorage.tags)
    tags = JSON.parse(localStorage.tags).map(function(tag, index){return {value: tag, label: tag};});
    var fields = (
      <div>
      <div className="form-group">
    <label htmlFor="inputChannelName">Channel Name</label>
    <input required="required" type="text" className="form-control" id="inputChannelName" value={this.state.channelName} onChange={this.handleNameChange}/>
  </div>
      <div className="form-group">
    <label htmlFor="inputChannelUrl">Channel Url</label>
    <input required="required" type="text" className="form-control" id="inputChannelUrl" value={this.state.channelUrl} onChange={this.handleUrlChange}/>
  </div>
        <div className="form-group">
    <label htmlFor="inputChannelTags">Channel Tags</label>
          <Select required={true} multi={true} name="inputChannelTags" value={this.state.channelTags} options={tags} onChange={this.handleTagsChange} />
   
  </div>
     </div>
    )
    return(
       <ModalFormTemplate fields={fields} actionText={this.props.actionText} handleSubmit={this.handleSubmit}/>
    
    )
  }});

  export default ChannelForm;