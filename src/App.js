import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from './logo.svg';
import './App.css';

var App = React.createClass({
  render: function(){
    return(
      <div id="app">
      <div className="container">
  <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link className="navbar-brand" to="/">News</Link>    
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li><Link to="/channels">Channels</Link></li>
        <li><Link to="/tags">Tags</Link></li>
      </ul>
    </div>
  </div>
</nav>
                {this.props.children}

</div>
      
      </div>
    );
  }
});

export default App;
