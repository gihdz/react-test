import React from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

var Channels = React.createClass({
  getInitialState: function(){
    return {channels:[],
           actionText: "Add Channel",
           selectedChannel: null,
           formFunction: this.createChannel};
  },
  setChannels: function(){
    let channels = [];
    if(localStorage.channels) channels = JSON.parse(localStorage.channels);
    else{      
    channels = [
      {name: "Top Stories", url: "http://rss.cnn.com/rss/edition.rss", tags: ["sports", "breaking"]},
      {name: "World", url: "http://rss.cnn.com/rss/edition_world.rs ds", tags: ["weather"]},
        {name: "Africa", url: "http://rss.cnn.com/rss/edition_africa.rss", tags: ["people"]}
      
    ];
    localStorage.channels = JSON.stringify(channels);
    }
    this.setState({channels});
  },
    editChannel: function(index){
      browserHistory.push(`channel/form/${index}`);    
  },
  deleteChannel: function(index){
    var channels = this.state.channels;
    channels.splice(index, 1);
    localStorage.channels = JSON.stringify(channels);
    this.setChannels();
  },
  
  componentDidMount: function(){
    this.setChannels();
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
        return channel.tags.indexOf(self.props.params.tag) !== -1;
      });
        
      }
      
    channels = channels.map((channel, index) => {
      return(
        <tr id={index} data-channelname={channel.name} data-channelurl={channel.url} data-channeltags={channel.tags} key={index}>
          <td>
            <a href={channel.url} target="_blank">{channel.name} </a>
          
          </td>
          <td>
            {channel.tags.join(", ")}
          </td>
          <td>
            <button data-toggle="tooltip" title="Edit channel" onClick={self.editChannel.bind(this, index)}  type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
          <button data-toggle="tooltip" title="Delete channel" onClick={self.deleteChannel.bind(this, index)}  type="button" className="btn btn-default">
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
    return(
      <div>
        <h3><Link to="/channels">Channels</Link>{self.props.params.tag ? " > " + self.props.params.tag : ""}</h3> 
        <Link to="/channel/form" className="btn btn-default"> Add Channel</Link>
        
        <hr/>
      {result}        
        </div>
    );
  }
});

export default Channels;