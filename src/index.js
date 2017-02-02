import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory  } from 'react-router'
import App from './App';
import Channels from './mods/Channels'
import ChannelForm from "./mods/ChannelForm"
import Tags from './mods/Tags'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
ReactDOM.render(( 
<Router history = {browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Channels}/>
      <Route path="channel/form(/:id)" component={ChannelForm}/>  
      <Route path="channels" component={Channels}>
        <Route path="tag/:tag"  />        
      </Route>
      <Route path="tags" component={Tags} />
    </Route>   
  </Router>
), document.getElementById('root'))