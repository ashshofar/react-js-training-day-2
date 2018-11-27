import React, { Component } from 'react';
import './App.css';
import IconLabelTabs from './components/IconLabelTabs';
import api from './api';
import FolderList from './components/FolderList';
import FavoriteList from './components/FavoriteList';
import TextField from '@material-ui/core/TextField';
import DetailUser from './components/DetailUser';

import { hot } from 'react-hot-loader';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class App extends Component {

  state = {
    users: [],
    loading: false,
    loadingMore: false,
    morePage: true,
    page: 1,
    count: 0,
    value: 0,
    name: '',
    phone: '',
    address: '',
    photo: '',
    user: {
      data: {},
      status: false
    }
  }

  componentDidMount() {
    this.fetchUser()
    this.onScroll()
  }

  handleChangeInput = e => {
    const key = e.target.name
    const itemText = e.target.value
    
    this.setState({
      [key]: itemText
    })
  }

  onScroll = () => {
    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop 
            ===
          document.documentElement.offsetHeight) {
            this.fetchMoreUser()
          }
    }
  }

  fetchUser = async () => {
    this.setState({loading:true})
    let page = this.state.page

    const {data} = await api.get(`/users/${page}`)

    this.setState({
      loading:false, 
      users:data.data,
      count: data.count,
      page: page + 1
    })
  }
    
  fetchMoreUser = async () => {
    this.setState({loadingMore:true})

    let page = this.state.page

    const {data} = await api.get(`/users/${page}`)

    // if(this.state.count < data.count){
      this.setState(state=>({
        users: [...state.users, ...data.data]
      }))
    // }

    this.setState({
      loadingMore:false,
      page: page + 1,
      count: data.count
    })
  }
  
  handleChange = (event, value) => {
      this.setState({ value });
  };

  handleSubmit = () => {

    let item = new FormData();
    item.append('name', this.state.name)
    item.append('address', this.state.address)
    item.append('phone', this.state.phone)
    item.append('photo', this.state.photo)

    api.post(`/users`, item).then((response) => {
      this.setState({
        name: '',
        phone: '',
        address: '',
        photo: ''
      })
    })
  }

  fileChangedHandler = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  deleteUser = (id) => {
    api.delete(`/users/${id}`).then((response) => {
      this.setState({
        page: 1
      })
      this.fetchUser()
    })

  }

  patchUser = (item) => {

    let status = item.favorite ? false : true;

    api.patch(`/users/${item.id}`, {
      favorite: status
    }).then((response) => {
      this.setState({
        page: 1
      })
      this.fetchUser()
    })
  }

  onView = (item) => {

    this.setState((state) => (
      {user: {
        data: {...state.user.data, ...item},
        status: !state.user.status
      }}
    ))
  }

  cancelView = () => {

    this.setState({
      user: {
        data: {},
        status: false
      }
    })
  }

  renderItem = () => {
    if (this.state.value === 0) {
      return this.state.user.status ? <DetailUser user={this.state.user} cancelView={this.cancelView} /> : this.renderList();
    }
    if (this.state.value === 1) {
      return this.renderFavorite();
    }
    if (this.state.value === 2) {
      return this.renderForm()
    }
  };

  renderFavorite = () => {
    return (
      <FavoriteList
        users={this.state.users}
        patchUser={(item) => this.patchUser(item)}
      />
    )
  }

  renderList = () => {
    return (
      <FolderList
        users={this.state.users}
        deleteUser={(id) => this.deleteUser(id)}
        patchUser={(item) => this.patchUser(item)}
        onView={(item) => this.onView(item)}
      />
    )
  }

  renderForm = () => {
    return (
      <FormControl>
        <img
          src={ this.state.photo && URL.createObjectURL(this.state.photo) }
          height="100"
          width="100"
        />
        <div>
          <input type="file" onChange={this.fileChangedHandler}/>
        </div>
        <div>
          <TextField
            id="name"
            label="Name"
            margin="normal"
            variant="outlined"
            name="name"
            onChange = {this.handleChangeInput}
            value={this.state.name}
          />
        </div>
        <div>
          <TextField
            id="phone"
            label="Phone"
            margin="normal"
            variant="outlined"
            name="phone"
            onChange = {this.handleChangeInput}
            value={this.state.phone}
          />
        </div>
        <div>
          <TextField
            id="address"
            label="Address"
            margin="normal"
            variant="outlined"
            name="address"
            onChange = {this.handleChangeInput}
            value={this.state.address}
          />
        </div>
        <Button onClick={this.handleSubmit}>
          Submit
        </Button>
      </FormControl>
    )
  }


  render() {
    return (
      <div className="d-flex justify-content-center">
        <IconLabelTabs
          value={this.state.value}
          handleChange={this.handleChange}
        >
          {this.renderItem()}
        </IconLabelTabs>

      </div>
    );
  }
}

export default hot(module)(App);
