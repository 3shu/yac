import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './assets/index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/signup.component';
import Join from './components/join.component';
import Login from './components/login.component';
import Chat from './components/chat.component';
class App extends Component {

  
  render() {
    return (
      <Router>
        <div className="App">
          
          <Switch>
              <Route exact path="/" component={Login} />
              <Route path='/signup' component={ Signup } />
              <Route path='/join' component={ Join } />
              <Route path='/chat/:nickname/:room' component={ Chat } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
