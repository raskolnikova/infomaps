import React, {Component} from 'react'
import NavBar from '../../components/navbar/index';
import Map from '../../components/map/index';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'elemental'
import ChartStore from './../../stores/ChartStore'
import ChartActions from '../../action/ChartAction'
import ListChart from '../../components/list-chart'

import './index.less'

function getStateFromFlux() {
  return {isLoading: ChartStore.isLoading(), charts: ChartStore.getСharts(),  modalIsOpen: false,
            cancelButtonClicked: false,
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

     modalOpen() {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
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
 
    render() {
        return (
            <div>
                <NavBar/>

                <div className="info-board">
                    <div className="panel left-chart">
                        <div id="1" className="container-chart" onClick={() => this.modalOpen()}>
                            <i className="fa fa-plus fa-5x icon-plus"></i>
                        </div>
                        <div id="2" className="container-chart" onClick={() => this.modalOpen()}>
                            <i className="fa fa-plus fa-5x icon-plus"></i>
                        </div>
                    </div>
                    <Map id_map="map"  dataForMap={this.state.dataForMap} />
                    <div className="panel right-chart">
                        <div id="3" className="container-chart" onClick={() => this.modalOpen()}>
                            <i className="fa fa-plus fa-5x icon-plus"></i>
                        </div>
                        <div id="4" className="container-chart" onClick={() => this.modalOpen()}>
                            <i className="fa fa-plus fa-5x icon-plus"></i>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} onCancel={()=>this.modalOpen()} backdropClosesModal>
                    <ModalHeader text="Выберете диаграмму" showCloseButton onClose={()=>this.modalOpen()}/>
                    <ModalBody>
                        <ListChart charts={this.state.charts}  onChartDelete = {this.handleChartDelete} onOpenChart = { (data) => this.props.getDataChart(data)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="primary">Выбрать</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }
}
