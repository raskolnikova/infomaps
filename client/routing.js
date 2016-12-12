import React, {Component} from 'react';

import HomePage from './pages/homepage/index'
import Charts from './pages/chart/index'
import Maps from './pages/page-maps/index'
import Login from './pages/login/index'
import NotFound from './pages/not-found/index'
import EditorChart from './pages/editor-chart/index'
import EditorMap from './pages/editor-map/index'
import Datasets from './pages/datasets-page/index'


import {Route, IndexRoute} from 'react-router'

export const routes = (
    <div>
        <Route path='/' component={HomePage}/>
        <Route path='/charts' component={Charts}/>
        <Route path='/page-maps' component={Maps}/>
        <Route path='/editor-chart' component={EditorChart}/>
        <Route path='/editor-map' component={EditorMap}/>
        <Route path='/datasets' component={Datasets}/>
        <Route path='login' component={Login}/>
        <Route path='*' component={NotFound}/>
    </div>
)
