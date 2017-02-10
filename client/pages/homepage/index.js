import React, {Component} from 'react'
import ChartStore from './../../stores/ChartStore'
import ChartActions from '../../action/ChartAction'
import ListChart from '../../components/list-chart'
import NavBar from '../../components/navbar/index';
import SetElements from '../../components/set-elements/index';
import Map from '../../components/map/index';

import './index.less'

function getStateFromFlux() {
    return {isLoading: ChartStore.isLoading(), charts: ChartStore.getСharts()};
}

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            isOpenSetElements: true,
            typeList: 'none'
        }
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

    getListElements(type) {
        switch (type) {
            case 'charts':
                return <ListChart charts={this.state.charts} onChartDelete={this.handleChartDelete} onOpenChart= { (data) => this.props.getDataChart(data)}/>
            case 'maps':
                console.log('maps');
                break;
            case 'text':
                console.log('text');
                break;
            default:
                console.log('error');
        }
    }

    handleChangeSetElements(typeList) {
        console.log(this.state);
        this.setState((prevState, props) => ({
            isOpenSetElements: !prevState.isOpenSetElements,
            typeList: typeList
        }));
    }

    render() {
        return (
            <div>
                <NavBar/> {this.state.isOpenSetElements
                    ? <SetElements charts={this.state.charts} handleChangeSetElements={(typeList) => this.handleChangeSetElements(typeList)}/>
                  : <div className='list-elements'>{this.getListElements(this.state.typeList)}</div>
}
                <Map id_map = "map"/>
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }
}
