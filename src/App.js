import React, { Component } from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Reg from './pages/reg/Reg'
import Nav from './pages/nav/Nav'
import Forget from './pages/forget/Forget'
import Maplocal from './pages/map/Map'
import Citylist from './pages/city/Citylist'
import Search from './pages/search/Search'

export default class App extends Component {
  render() {
    return (
      <div style={{height:'100%'}}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/reg" component={Reg}></Route>
            <Route path="/nav" component={Nav}></Route>
            <Route path="/forget" component={Forget}></Route>
            <Route path="/map" component={Maplocal}></Route>
            <Route path="/citylist" component={Citylist}></Route>
            <Route path="/search" component={Search}></Route>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
