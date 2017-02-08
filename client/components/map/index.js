import React, {Component} from 'react';
import statesData from '../../../geodata/russia.json'
import L from 'leaflet'
import './index.less'
import '../../../node_modules/leaflet/dist/leaflet.css'

export default class Map extends Component {


    componentDidMount() {
        var map = L.map("map").setView([
            51.7, 36.6
        ], 2);
       L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

      L.geoJson(statesData).addTo(map);


    }

    render() {
        return (
            <div>
                <div id="map"></div>
            </div>
        )

    }
}
