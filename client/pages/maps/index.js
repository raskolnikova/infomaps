import React, {Component} from 'react';
import NavBar from '../../components/navbar'
import NewMap from '../../components/new-map'
import ListMaps from '../../components/list-maps'

import MapStore from './../../stores/MapStore'
import MapAction from '../../action/MapAction.js'

import './index.less'


function getStateFromFlux() {
    return {isLoading: MapStore.isLoading(), maps: MapStore.getMaps()};
}

export default class PageMaps extends Component {
    constructor() {
        super()
        this.state = getStateFromFlux();
        this._onChange = this._onChange.bind(this)
    }

    componentWillMount() {
        MapAction.loadMaps();
    }

    componentDidMount() {
        MapStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        MapStore.removeChangeListener(this._onChange);
    }

    handleMapDelete(map) {
        MapAction.deleteMap(map.id);
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className='charts-container'>
                    <NewMap clickNewMap ={() => this.props.clickNewMap()}/>
                    <ListMaps maps={this.state.maps} onMapDelete={this.handleMapDelete} onOpenMap= { (data) => this.props.getDataMap(data)}/>
                </div>
            </div>
        )

    }
    _onChange() {
        this.setState(getStateFromFlux())
    }
}
