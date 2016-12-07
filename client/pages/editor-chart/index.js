import React, {Component} from 'react'
import NavEditorChart from '../../components/nav-editor-chart/index'
import Table from '../../components/table/index'
import Chart from '../../components/chart/index'
import CostamizationEmptyTable from '../../components/costamization_empty_table'
import {FormSelect} from 'elemental'

import './index.less'

const controlCharts = [
    {
        label: 'График',
        value: 'График'
    }, {
        label: 'Гистограмма',
        value: 'Гистограмма'
    }, {
        label: 'Круговая диаграмма',
        value: 'Круговая диаграмма'
    }, {
        label: 'Кольцевая диаграмма',
        value: 'Кольцевая диаграмма'
    }
]

export default class EditorChart extends Component {

    constructor()
    {
        super()
        this.state = {
            inputSelect: "График",
            columns: [],
            showCostamization: true,
            data: [],
            visibleColumns:[]
        }
    }

    updateSelect(option) {
        this.setState({inputSelect: option});
    }

    createTable(dataset) {
        this.setState(prevState => ({
            data: JSON.parse(dataset.file),
            showCostamization: !prevState.showCostamization,
            columns: this.getColumn(JSON.parse(dataset.file))
        }));
    }

    getColumn(data) {
        let columns = [];
        for (let key in data[0]) {
            columns.push(key)
        }
        return columns
    }

    passDataFromTableToEditorChart(data,visibleColumns) {
        this.setState({data: data, visibleColumns:visibleColumns})
    }

    render() {
        return (
            <div>
                <NavEditorChart/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>

                        {this.state.showCostamization
                            ? <CostamizationEmptyTable createTable={(dataset) => this.createTable(dataset)}/>
                          : <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditorChart={(data,visibleColumns) => this.passDataFromTableToEditorChart(data,visibleColumns)}/>}

                    </div>
                    <div className="chart-wrap">
                        <div className="select">
                            <FormSelect options={controlCharts} onChange={(e) => this.updateSelect(e)}/>
                            <Chart data={this.state.data} visibleColumns={this.state.visibleColumns} typeChart={this.state.inputSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
