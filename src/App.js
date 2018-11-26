import React, { Component } from 'react';
import './App.css';
import IconLabelTabs from './components/IconLabelTabs';

import { hot } from 'react-hot-loader';

class App extends Component {

  state = {
    'loading': false,
    'users': []
  }

  fetchUser = () => {
    this.setState({ loading: true }, () =>
      api.get(`/?nat=us&results=12`).then(({ data }) => {
        this.setState({ loading: false, users: data.results });
      })
    );
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <IconLabelTabs/>
      </div>
    );
  }
}

export default hot(module)(App);
