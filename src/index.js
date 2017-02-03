import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import Channels from './mods/Channels'
import ChannelForm from "./mods/ChannelForm"
import TagForm from "./mods/TagForm"
import Tags from './mods/Tags'
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import $ from "jquery"
// window.jQuery = $;
// require('bootstrap/dist/js/bootstrap.min.js');


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
ReactDOM.render(( 
<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Channels}/>
      <Route path="channel/form(/:id)" component={ChannelForm}/>  
      <Route path="channels" component={Channels}>
        <Route path="tag/:tag"  />        
      </Route>
       <Route path="tag/form(/:id)" component={TagForm}/>  
      <Route path="tags" component={Tags} />
    </Route>   
  </Router>
), document.getElementById('root'))