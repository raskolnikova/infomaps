import React, {Component} from 'react';
import L from 'leaflet'
import './index.less'
import '../../../node_modules/leaflet/dist/leaflet.css'

export default class Map extends Component {
    componentDidMount() {
        var map = L.map("map").setView([
            51.7, 36.6
        ], 5);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

        L.control.scale().addTo(map);

    }

    render() {
        return (
            <div id="map"></div>
        )

    }
}
