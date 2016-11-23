import React, {Component} from 'react'
import {Router, hashHistory} from 'react-router'
import {routes} from './routing'

export default class App extends Component {
  render () {
      return (
          <Router  history={hashHistory} routes={routes}/>
      )
    }
}
