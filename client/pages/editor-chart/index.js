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

// const chartData = [
//     {
//         "name": "Lavon Hilll I",
//         "BMI": 20.57,
//         "age": 12,
//         "birthday": "1994-10-26T00:00:00.000Z",
//         "city": "Annatown",
//         "married": true,
//         "index": 1
//
//     }, {
//         "name": "Clovis Pagac",
//         "BMI": 24.28,
//         "age": 26,
//         "birthday": "1995-11-10T00:00:00.000Z",
//         "city": "South Eldredtown",
//         "married": false,
//         "index": 3
//
//     }, {
//         "name": "Gaylord Paucek",
//         "BMI": 24.41,
//         "age": 30,
//         "birthday": "1975-06-12T00:00:00.000Z",
//         "city": "Koeppchester",
//         "married": true,
//         "index": 5
//     }, {
//         "name": "Ashlynn Kuhn MD",
//         "BMI": 23.77,
//         "age": 32,
//         "birthday": "1985-08-09T00:00:00.000Z",
//         "city": "West Josiemouth",
//         "married": false,
//         "index": 6
//     }
// ]

export default class EditorChart extends Component {

    constructor()
    {
        super()
        this.state = {
            inputSelect: "График",
            columns: [],
            showCostamization: true,
            data: []
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

    passDataFromTableToEditorChart(data) {
        this.setState({data: data})
        console.log(this.state.data)
    }

    render() {
        return (
            <div>
                <NavEditorChart/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>

                        {this.state.showCostamization
                            ? <CostamizationEmptyTable createTable={(dataset) => this.createTable(dataset)}/>
                          : <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditorChart={(data) => this.passDataFromTableToEditorChart(data)}/>}

                    </div>
                    <div className="chart-wrap">
                        <div className="select">
                            <FormSelect options={controlCharts} onChange={(e) => this.updateSelect(e)}/>
                            <Chart data={this.state.data} typeChart={this.state.inputSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
