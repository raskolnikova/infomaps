import React, {Component} from 'react'
import NavBar from '../../components/navbar/index';
import Map from '../../components/map/index';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button,FormSelect} from 'elemental'
import ChartStore from './../../stores/ChartStore'
import ChartActions from './../../action/ChartAction'
import MapStore from './../../stores/MapStore'
import MapActions from '../../action/MapAction'
import ListChart from '../../components/list-chart'
import Chart from '../../components/chart'

import './index.less'

const controlCharts = [{
    'label': 'График',
    value: 'Граф'
}, {
    label: 'Гистограмма',
    value: 'Гистограмма'
}, {
    label: 'Круговая диаграмма',
    value: 'Круговая диаграмма'
}, {
    label: 'Кольцевая диаграмма',
    value: 'Кольцевая диаграмма'
}]


function getStateFromFlux() {
   var  controlMaps = MapStore.getMaps().map(a=>{return {label:a.name}})
   controlMaps.unshift({label:'Выберете карту'})
    return {
        charts: ChartStore.getСharts(),
        modalIsOpen: false,
        cancelButtonClicked: false,
        choiseCharts: [null, null, null, null],
        controlMaps:controlMaps,
        maps: MapStore.getMaps(),
         isUpdateMap: false,
        choiseMap:  {},
         dataForMap: {
              'ISO3Column':'',
              'data': [],
              'visibleColumns':[],
              'colorScheme': 0,
              'domen':[1000000,100000,10000,1000,100,10]
            }
    };
}

export default class HomePage extends Component {

    constructor() {
        super();

        this.state = getStateFromFlux();

        this._onChange = this._onChange.bind(this)

    }

    modalOpen(numberChart) {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen,
            numberCurrentChart: numberChart
        }));

    }

    cancelButtonClicked() {
        return this.state.cancelButtonClicked;
    }

    resetCancelButtonClicked() {
        this.setState({ cancelButtonClicked: false });
    }

    componentWillMount() {
        ChartActions.loadChart();
        MapActions.loadMaps();
    }

    componentDidMount() {
        ChartStore.addChangeListener(this._onChange);
        MapStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ChartStore.removeChangeListener(this._onChange);
        MapStore.removeChangeListener(this._onChange);

    }

    handleChartDelete(chart) {
        ChartActions.deleteChart(chart.id);
    }

    setChart(data) {
        let choiseCharts = this.state.choiseCharts;
        choiseCharts[this.state.numberCurrentChart] = data;
        this.setState({ choiseCharts: choiseCharts, modalIsOpen: false })
    }


    updateSelect(option) {
        for(let i=0;i<this.state.maps.length;i++){
            if(this.state.maps[i].name===option){
                this.setState({ choiseMap: this.state.maps[i],
                     isUpdateMap:true,
                dataForMap: {
                    'ISO3Column':this.state.maps[i].ISO3Column,
                    'data':this.state.maps[i].data ,
                    'visibleColumns':this.state.maps[i].visibleColumns,
                    'colorScheme': this.state.maps[i].colorSchema[0],
                    'domen':this.state.maps[i].domen
            }
             })
                
                break;
            }

        }
        
    }

 
    render() {
        return (
            <div>
                <NavBar/>
<div className="select-input">
   <FormSelect options = { this.state.controlMaps }
                         onChange = { (e) => this.updateSelect(e) }/> 
</div>



                <div className="info-board">
                    <div className="panel left-chart">
                    <div id="1" className="container-chart" onClick={() => this.modalOpen(0)}>
                        {this.state.choiseCharts[0]!==null
                        ? <Chart data = { this.state.choiseCharts[0].file }
                            visibleColumns = { this.state.choiseCharts[0].visibleColumns }
                            typeChart = { this.state.choiseCharts[0].type }
                            isUpdateChart = { true }
                            isfromConstructor={true}
                            /> 
                        :  <i className="fa fa-plus fa-5x icon-plus"></i>
                    }
                </div>
                        <div id="2" className="container-chart" onClick={() => this.modalOpen(1)}>
                             {this.state.choiseCharts[1]!==null
                        ? <Chart data = { this.state.choiseCharts[1].file }
                            visibleColumns = { this.state.choiseCharts[1].visibleColumns }
                            typeChart = { this.state.choiseCharts[1].type }
                            isUpdateChart = { true }
                            isfromConstructor={true}
                            /> 
                        :  <i className="fa fa-plus fa-5x icon-plus"></i>
                    }
                        </div>
                    </div>
                    <div className={this.state.modalIsOpen?"map-not-available":"map-available"} > 
                        <Map id_map="map" dataForMap={this.state.dataForMap}  typeMap={this.state.choiseMap.type} isUpdateMap={this.state.isUpdateMap} notice={''}/>
                    </div>
                    <div className="panel right-chart">
                        <div id="3" className="container-chart" onClick={() => this.modalOpen(2)}>
                            {this.state.choiseCharts[2]!==null
                        ? <Chart data = { this.state.choiseCharts[2].file }
                            visibleColumns = { this.state.choiseCharts[2].visibleColumns }
                            typeChart = { this.state.choiseCharts[2].type }
                            isUpdateChart = { true }
                            isfromConstructor={true}
                            /> 
                        :  <i className="fa fa-plus fa-5x icon-plus"></i>
                    }
                        </div>
                        <div id="4" className="container-chart" onClick={() => this.modalOpen(3)}>
                             {this.state.choiseCharts[3]
                        ? <Chart data = { this.state.choiseCharts[3].file }
                            visibleColumns = { this.state.choiseCharts[3].visibleColumns }
                            typeChart = { this.state.choiseCharts[3].type }
                            isUpdateChart = { true }
                            isfromConstructor={true}
                            /> 
                        :  <i className="fa fa-plus fa-5x icon-plus"></i>
                    }
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} onCancel={()=>this.modalOpen()} backdropClosesModal>
                    <ModalHeader text="Выберете диаграмму" showCloseButton onClose={()=>this.modalOpen()}/>
                    <ModalBody>
                        <ListChart charts={this.state.charts}  onChartDelete = {this.handleChartDelete} onOpenChart = { (data) => this.setChart(data)}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }
}
