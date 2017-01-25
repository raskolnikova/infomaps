import React, {Component} from 'react';
import ChartsPage from '../../pages/chart/index'
import EditorChartPage from '../../pages/editor-chart/index'

export default class ContainerCharts extends Component {

    constructor() {
        super();
        this.state = {
            isOpenEditChart: false,
            dataChart: {}
        }
    }

    getData(data) {
        this.setState({isOpenEditChart: true, dataChart: data})
    }

    handleClickNewChart() {
        this.setState({isOpenEditChart: true})
    }

    handleClickBackChart() {
        this.setState({isOpenEditChart: false})
    }

    render() {
        return (
            <div>
                {this.state.isOpenEditChart
                    ? <EditorChartPage dataChart={this.state.dataChart} clickBackChart={() => this.handleClickBackChart()}/>
                    : <ChartsPage getDataChart={(data) => this.getData(data)} clickNewChart={() => this.handleClickNewChart()}/>
}
            </div>
        )
    }
}
