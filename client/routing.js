import React, {Component} from 'react';

import HomePage from './pages/homepage/index'
import Charts from './pages/chart/index'
import Login from './pages/login/index'
import NotFound from './pages/not-found/index'
import EditorChart from './pages/editor-chart/index'
import Datasets from './pages/datasets-page/index'

import {Route, IndexRoute} from 'react-router'

export const routes = (
    <div>
        <Route path='/' component={HomePage}/>
        <Route path='/charts' component={Charts}/>
        <Route path='/editor-chart' component={EditorChart}/>
        <Route path='/datasets' component={Datasets}/>
        <Route path='login' component={Login}/>
        <Route path='*' component={NotFound}/>
    </div>
)
