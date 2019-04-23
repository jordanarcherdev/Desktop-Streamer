import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import StreamList from './streams/StreamList';

import RegisterUser from './users/RegisterUser';
import Login from './users/Login';

import StreamCreate from './streams/StreamCreate';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';


import history from '../history';

//Auth check for token
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions';
import jwt_decode from 'jwt-decode';
import store from '../store';

if(localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuth
  store.dispatch(setCurrentUser(decoded));
}

class App extends React.Component {

  render(){
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={StreamList} />
              <Route path="/users/register" exact component={RegisterUser} />
              <Route path="/users/login" exact component={Login} />
              <Route path="/streams/add" exact component={StreamCreate} />
              <Route path="/streams/show/:id" exact component={StreamShow} />
              <Route path="/streams/delete/:id" exact component={StreamDelete} />
              <Route path="/streams/edit/:id" exact component={StreamEdit} />
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
