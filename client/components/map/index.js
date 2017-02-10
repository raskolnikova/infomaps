import React, {Component} from 'react';
import statesData from '../../../geodata/us_states.json'
import L from 'leaflet'
import './index.less'
import '../../../node_modules/leaflet/dist/leaflet.css'

export default class Map extends Component {

    componentDidMount() {

        let map = L.map(this.props.id_map).setView([
            51.7, 36.6
        ], 2);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

        let geoJSON = L.geoJSON(statesData, {
            style: (feature) => this.getStyle(feature),
            onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
        }).addTo(map)

        let info = L.control();

        info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function(props) {
            this._div.innerHTML = '<h4>US Population Density</h4>' + (props
                ? '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
                : 'Hover over a state');
        };
        info.addTo(map);

        let legend = L.control({position: 'bottomright'});

        let getColor = this.getColor

        legend.onAdd = function(map) {
            let div = L.DomUtil.create('div', 'info legend'),
                grades = [
                    0,
                    10,
                    20,
                    50,
                    100,
                    200,
                    500,
                    1000
                ],
                labels = [];
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1]
                    ? '&ndash;' + grades[i + 1] + '<br>'
                    : '+');
            }

            return div;
        };

        legend.addTo(map);

        this.setState({geoJSON: geoJSON, map: map, info: info})
    }

    getColor(d) {
        return d > 1000
            ? '#800026'
            : d > 500
                ? '#BD0026'
                : d > 200
                    ? '#E31A1C'
                    : d > 100
                        ? '#FC4E2A'
                        : d > 50
                            ? '#FD8D3C'
                            : d > 20
                                ? '#FEB24C'
                                : d > 10
                                    ? '#FED976'
                                    : '#FFEDA0';
    }

    getStyle(feature) {
        return {
            fillColor: this.getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    highlightFeature(e) {
        let layer = e.target;
        layer.setStyle({weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7});
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        this.state.info.update(layer.feature.properties)
    }

    resetHighlight(e) {
        this.setState((prevState, props) => {
            return {
                geoJSON: prevState.geoJSON.resetStyle(e.target)
            }
        })
        this.state.info.update()
    }

    zoomToFeature(e) {
        this.setState((prevState, props) => {
            return {
                map: prevState.map.fitBounds(e.target.getBounds())
            }
        })
    }

    onEachFeature(feature, layer) {
        layer.on({
            mouseover: (e) => this.highlightFeature(e),
            mouseout: (e) => this.resetHighlight(e),
            click: (e) => this.zoomToFeature(e)
        });
    }

    render() {
        return (
            <div>
                <div id={this.props.id_map}></div>
            </div>
        )

    }
}
