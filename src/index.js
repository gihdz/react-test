import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router'
import App from './App';
import Channels from './mods/Channels'
import Tags from './mods/Tags'
import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
ReactDOM.render(( 
<Router history = {browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Channels}/>
      <Route path="channels(/:tag)" component={Channels} />
      <Route path="tags" component={Tags} />
    </Route>   
  </Router>
), document.getElementById('root'))