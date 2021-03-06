import React, {Component} from 'react';
import USMap from '../../../geodata/countries/us_states.json'
import WorldMap from '../../../geodata/countries/World.json'
import RUSMap from '../../../geodata/countries/russia.json'
import L from 'leaflet'
import '../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.css'
import './index.less'
import '../../../node_modules/leaflet/dist/leaflet.css'



const ColorSchemes = [
    [
        '#bd0026',
        '#f03b20',
        '#fd8d3c',
        '#feb24c',
        '#fed976',
        '#ffffb2',
    ],
    [
        '#eff3ff',
        '#c6dbef',
        '#9ecae1',
        '#6baed6',
        '#3182bd',
        '#08519c'
    ],
    [
        '#edf8e9',
        '#c7e9c0',
        '#a1d99b',
        '#74c476',
        '#31a354',
        '#006d2c'
    ],
    [
        '#ffffcc',
        '#c7e9b4',
        '#7fcdbb',
        '#41b6c4',
        '#2c7fb8',
        '#253494'
    ]

]

export default class Map extends Component {

    constructor() {
        super()
        this.state = {
            typeMap: 'Карта мира',
            geoJSONMap: WorldMap,
            geoJSON: {},
            map: {},
            info: {},
            legend:{},
            visibleColumns: [],
            dataForMap: {
                 visibleColumns: [],
                   colorScheme:0,
                    domen:[10000000,1000000,100000,10000,1000,100],
                    ISO3Column:''
            },
            colorScheme:0,
            domen:[10000000,1000000,100000,10000,1000,100]
        }
    }

    componentDidMount() {

       //проблема с webpack для отображения маркера
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });

        let map = L.map(this.props.id_map, {
            center: new L.LatLng(51.7,36.6),
             zoom: 2,
            contextmenu: true,
            contextmenuWidth: 140,
            contextmenuItems: [{
                text: 'Добавить маркер',
                callback: this.showCoordinates
            },
            {
                text: 'Добавить текст',
                callback: this.showCoordinates
            }]
        });

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

        let geoJSON = L.geoJSON(this.state.geoJSONMap, {
            style: (feature,dataForMap) => this.getStyle(feature,this.state.dataForMap),
            onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
        }).addTo(map)

        let info = L.control();
        info.onAdd = (map) => this.infoAdd(map)
        info.update = (props,notice) => this.infoUpdate(props,this.props.notice)
        info.addTo(map);

        let legend = L.control({position: 'bottomright'});
        legend.onAdd = () => this.legendAdd(this.getColor,this.state.domen)
        legend.addTo(map);
        this.setState({geoJSON: geoJSON, map: map, info: info, legend:legend})
    }

    infoAdd(map) {
        this._div = L.DomUtil.create('div', 'info');
        this.infoUpdate();
        return this._div;
    }

    infoUpdate(props,notice) {
        this._div.innerHTML = '<h4>Примечание</h4>' + (props
            ? '<b>' + props.NAME_LONG + '</b><br />' + props.density + ' '+notice
            : 'Наведите на область');
    }

    legendAdd(getColor,domen) {
        let div = L.DomUtil.create('div', 'info legend'), labels = [];
        for (let i = 0; i < domen.length; i++) {
            let color = getColor(domen[i] + 1,this.state.colorScheme,domen)
            div.innerHTML += '<i style="background:' + color + '"></i> ' + domen[i] + (domen[i + 1]
                ? '&ndash;' + domen[i + 1] + '<br>'
                : '+');
        }
        return div;
    }

 showCoordinates (e) {
     console.log(this.state)
      L.marker(e.latlng).addTo(L.map);	
}

    componentWillReceiveProps(nextProps) {  
        this.updateTypeMap(nextProps.typeMap)
        this.updateNotice(nextProps.notice)

        if (!this.isEmptyObject(nextProps.dataForMap.data))
            this.updateDataMap(nextProps.dataForMap,nextProps.typeMap)
    }

    updateTypeMap(typeMap) {
        let map,
            geoJSON = {};
        if (typeMap !== this.state.typeMap) {
            map = this.state.map.removeLayer(this.state.geoJSON)
            geoJSON = L.geoJSON(this.getTypeMap(typeMap)).addTo(map)
            this.setState({typeMap: typeMap, geoJSONMap: this.getTypeMap(typeMap), map: map, geoJSON: geoJSON})
        }
    }

    updateNotice(notic) {
        let map = this.state.map;
        map.removeControl(this.state.info)
        let info = L.control();
        info.onAdd = (map) => this.infoAdd(map)
        info.update = (props, notice) => this.infoUpdate(props, notic)
        info.addTo(map)
        this.setState({ map: map, info: info })
    }

    updateDataMap(dataForMap,typeMap) {
          let map = this.state.map,
           data = dataForMap.data,
            geoJSON = {}

             map.removeControl(this.state.legend)
               let legend = L.control({position: 'bottomright'});
               legend.onAdd = () => this.legendAdd(this.getColor,this.state.domen)              
               legend.addTo(map);


        L.geoJSON(this.getTypeMap(typeMap)).eachLayer(function(featureClass) {
            for (let i = 0; i < Object.keys(data).length; i++)
                if (featureClass.feature.properties.ISO_A3 === data[i][dataForMap.ISO3Column])
                    featureClass.feature.properties[dataForMap.visibleColumns[0]] = data[i][dataForMap.visibleColumns[0]];
                }
            )

        this.setState({ visibleColumns: dataForMap.visibleColumns, colorScheme: dataForMap.colorScheme, domen: dataForMap.domen })
        var self = dataForMap;

        geoJSON = L.geoJSON(this.getTypeMap(typeMap), {
            style: (feature, dataForMap) => this.getStyle(feature, self),
            onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
        }
        ).addTo(map)


        this.setState({map: map, geoJSON: geoJSON,legend:legend})

    }
    

    isEmptyObject(obj) {
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    getColor(d, scheme, domen) {
        let colorScheme = ColorSchemes[scheme];
        return d > domen[0]
            ? colorScheme[0]
            : d > domen[1]
                ?  colorScheme[1]
                : d > domen[2]
                    ?  colorScheme[2]
                    : d > domen[3]
                        ?  colorScheme[3]
                        : d > domen[4]
                            ?  colorScheme[4]
                            : d > domen[5]
                                ?  colorScheme[5]
                                    : '#FFE';
    }

    getStyle(feature,dataForMap) {
        return {
            fillColor: this.getColor(feature.properties[dataForMap.visibleColumns[0]],dataForMap.colorScheme,dataForMap.domen),
            weight: 2,
            opacity: 1,
            color: 'grey',
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

    getTypeMap(typeChart) {
        switch (typeChart) {
            case 'Карта мира':
                return WorldMap
            case 'Карта США':
                return USMap
            case 'Карта России':
                return RUSMap
        }
    }

    render() {
        return (
            <div>
                <div id={this.props.id_map}></div>
            </div>
        )

    }
}
