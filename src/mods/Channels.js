import React from 'react';
import { Link } from 'react-router'
import ChannelForm from './ChannelForm'

var Channels = React.createClass({
  getInitialState: function(){
    return {channels:[],
           actionText: "Add Channel",
           selectedChannel: null,
           formFunction: this.createChannel};
  },
  setChannels: function(){
    var channels = [];
    if(localStorage.channels) channels = JSON.parse(localStorage.channels);
    else{      
    channels = [
      {name: "Top Stories", url: "http://rss.cnn.com/rss/edition.rss", tags: ["sports", "breaking"]},
      {name: "World", url: "http://rss.cnn.com/rss/edition_world.rss", tags: ["weather"]},
        {name: "Africa", url: "http://rss.cnn.com/rss/edition_africa.rss", tags: ["people"]}
      
    ];
    localStorage.channels = JSON.stringify(channels);
    }
    this.setState({channels: channels});
  },
 componentWillMount: function(){
   this.setChannels();
   
  },
  showModalForm: function(){
    // $("#form-modal").modal("show");
  },
   addChannel: function(e){
    this.setState({actionText:"Add Channel", selectedChannel: null, formFunction: this.createChannel}, this.showModalForm);
     
  },
  createChannel: function(value){
    if(!value || !value.name || !value.url || value.tags.length === 0) return;     
    localStorage.channels = JSON.stringify(this.state.channels.concat(value));
    this.setChannels();
  },
    editChannel: function(e){
    // var trChannel = $(e.target).closest("tr");
    //   trChannel.removeData();
    // var id = trChannel.attr("id");
    // var name = trChannel.data("channelname");
    //   var url = trChannel.data("channelurl");
    //   var tags = trChannel.data("channeltags").split(",");
    // this.setState({actionText: "Edit Channel", selectedChannel: {id:id, name: name, url:url, tags:tags }, formFunction: this.updateChannel}, this.showModalForm);
    
  },
  updateChannel: function(value){
    if(!value || !value.name || !value.url || value.tags.length === 0) return;
      this.state.channels[this.state.selectedChannel.id] = value;
    
    localStorage.channels = JSON.stringify(this.state.channels);
    this.setState({selectedChannel: null});
    this.setChannels();
     
    
  },
  deleteChannel: function(e){
    // var id = $(e.target).closest("tr").attr("id");
    // var channels = this.state.channels;
    // channels.splice(id, 1);
    // localStorage.channels = JSON.stringify(channels);
    // this.setChannels();
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
    <h4>No Channels to show. Add some channels!</h4>
    );
    if(this.state.channels.length > 0){
      var channels = this.state.channels;
      if(self.props.params.tag){
        channels = channels.filter(function(channel){
        return channel.tags.indexOf(self.props.params.tag) != -1;
      });
        
      }
      
    channels = channels.map(function(channel, index){
      return(
        <tr id={index} data-channelname={channel.name} data-channelurl={channel.url} data-channeltags={channel.tags} key={index}>
          <td>
            <a href={channel.url} target="_blank">{channel.name} </a>
          
          </td>
          <td>
            {channel.tags.join(", ")}
          </td>
          <td>
            <button data-toggle="tooltip" title="Edit channel" onClick={self.editChannel}  type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
          <button data-toggle="tooltip" title="Delete channel" onClick={self.deleteChannel}  type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>

            
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
              <th>tags</th>
            <th>actions</th>
            </tr>
          </thead>
          <tbody>
          {channels}
          </tbody>
        </table>
      </div>
      )
    }
    var channel = this.state.selectedChannel ? this.state.selectedChannel : {name: "", url: "", tags: []};
    return(
      <div>
        <h3><Link to="/channels">Channels</Link>{self.props.params.tag ? " > " + self.props.params.tag : ""}</h3> <button className="btn btn-default" type="button" onClick={this.addChannel}>Add Channel</button>
        <hr/>
      {result}        
             <ChannelForm channel={channel} actionText={this.state.actionText} handleFormSubmit={this.state.formFunction} />
        </div>
    );
  }
});

export default Channels;