import React, {Component} from 'react';
import NavBar from '../../components/navbar'
import NewChart from '../../components/new-chart'
import ListChart from '../../components/list-chart'

import ChartStore from './../../stores/ChartStore'
import ChartActions from '../../action/ChartAction'

import './index.less'

function getStateFromFlux() {
  return {isLoading: ChartStore.isLoading(), charts: ChartStore.getСharts()};
}


export default class Charts extends Component {

  constructor() {
    super()
     this.state = getStateFromFlux();
     this._onChange = this._onChange.bind(this)
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
                <div className='charts-container'>
                    <NewChart clickNewChart ={()=>this.props.clickNewChart()}/>
                    <ListChart charts={this.state.charts}  onChartDelete = {this.handleChartDelete} onOpenChart = { (data) => this.props.getDataChart(data)}/>
                </div>
            </div>
        )

    }

    _onChange() {
        this.setState(getStateFromFlux())
    }
}
