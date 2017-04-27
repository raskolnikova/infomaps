import React, {Component} from 'react';

import ContainerCharts from './containers/container-charts/index'
import ContainerMap from './containers/container-map/index'


import HomePage from './pages/homepage/index'
//import Charts from './pages/chart/index'
//import Maps from './pages/page-maps/index'
import Registration from './pages/registration/index'
import Login from './pages/login/index'
import NotFound from './pages/not-found/index'
import EditorChart from './pages/editor-chart/index'
import EditorMap from './pages/editor-map/index'
import Datasets from './pages/datasets-page/index'
import Scripts from './pages/scripts-page/index'


import {Route, IndexRoute} from 'react-router'

export const routes = (
    <div>
        <Route path='/' component={HomePage}/>
        <Route path='container-charts' >
            <IndexRoute component={ContainerCharts} />
            <Route path='editor-chart' component={EditorChart}/>
        </Route>
        <Route path='container-map' >
            <IndexRoute component={ContainerMap} />
            <Route path='editor-map' component={EditorMap}/>
        </Route>
        <Route path='/datasets' component={Datasets}/>
        <Route path='/scripts' component={Scripts}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/login' component={Login}/>
        <Route path='*' component={NotFound}/>
    </div>
)
