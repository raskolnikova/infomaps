import React, {Component} from 'react';
var topojson = require('topojson');
import d3 from 'd3'

import './index.css'

import mapWorld from '../../../geodata/countries/world_map.json'
import countryData from '../../../geodata/country_data.csv';

const colors = [
    '#a50026',
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee08b',
    '#d9ef8b',
    '#a6d96a',
    '#66bd63',
    '#1a9850',
    '#006837'
];

var years = [],
    currentYear = "2000",
    defColor = '#fff',
    getColor = d3.scale.quantize().domain([100, 0]).range(colors);

export default class Map extends Component {

    renderMap() {
        const width = 800,
              height = 550;
        let projection = d3.geo.mercator().scale(100)
        let svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);
        let path = d3.geo.path().projection(projection);
        let g = svg.append("g");
        g.selectAll("path").data(this.processData(mapWorld, countryData).features).enter().append("path").attr("class", "country").attr("d", path)
    }

    processData(worldMap, countryData) {
        var world = topojson.feature(worldMap, worldMap.objects.world);
        var countries = world.features;
        for (var i in countries) {
            for (var j in countryData) {
                if (countries[i].id == countryData[j].ISO3166) {
                    for (var k in countryData[j]) {
                        if (k != 'Country' && k != 'ISO3166') {
                            if (years.indexOf(k) == -1) {
                                years.push(k);
                            }
                            countries[i].properties[k] = Number(countryData[j][k])
                        }
                    }
                    countries[i].country = countryData[j].Country;
                    break;
                }
            }
        }
        return world;
    }

    sequenceMap() {
        d3.selectAll('.country').style('fill', function(d) {
            let color = getColor(d.properties[currentYear]);
            return color
                ? color
                : defColor;
        });
    }

    componentDidMount() {
        this.renderMap()
        this.sequenceMap()
    }

    render() {
        return (
            <div id="map"></div>
        )

    }
}
