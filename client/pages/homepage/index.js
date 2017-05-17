import React, {Component} from 'react'
import NavBar from '../../components/navbar/index';
import Map from '../../components/map/index';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'elemental'
import ChartStore from './../../stores/ChartStore'
import ChartActions from '../../action/ChartAction'
import ListChart from '../../components/list-chart'
import Chart from '../../components/chart'

import './index.less'

function getStateFromFlux() {
  return {  isLoading: ChartStore.isLoading(), 
            charts: ChartStore.getСharts(),  
            modalIsOpen: false,
            cancelButtonClicked: false,
             dataChart: {},
             choiseCharts:[null,null,null,null],
            dataForMap:{
                data:{}
            }};
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
           numberCurrentChart :numberChart
        }));

    }

    cancelButtonClicked() {
        return this.state.cancelButtonClicked;
    }

    resetCancelButtonClicked() {
        this.setState({cancelButtonClicked: false});
    }

     componentWillMount() {
     ChartActions.loadChart();
 }

 componentDidMount() {
     ChartStore.addChangeListener(this._onChange);
 }

 componentWillUnmount() {
     ChartStore.removeChangeListener(this._onChange);
 }

 handleChartDelete(chart) {
     ChartActions.deleteChart(chart.id);
 }

  setData(data) {
      let choiseCharts = this.state.choiseCharts;
      choiseCharts[this.state.numberCurrentChart]=data;
        this.setState({choiseCharts:choiseCharts, dataChart: data, modalIsOpen: false})
    }
 
    render() {
        return (
            <div>
                <NavBar/>

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
                    <Map id_map="map"  dataForMap={this.state.dataForMap} />
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
                        <ListChart charts={this.state.charts}  onChartDelete = {this.handleChartDelete} onOpenChart = { (data) => this.setData(data)}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }
}
