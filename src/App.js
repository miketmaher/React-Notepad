import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Navbar from './components/layout/Navbar';
import Notes from './components/notes/Notes';
import AddNote from './components/notes/AddNote';
import EditNote from './components/notes/EditNote';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container-fluid dashboard">
              <div className="row">
                <div className="col-md-3 sidebar">
                  <Notes />
                </div>
                <div className="col-md-9">
                  <Switch>
                    <Route exact path="/" component={AddNote} />
                    <Route exact path="/note/edit/:id" component={EditNote} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
