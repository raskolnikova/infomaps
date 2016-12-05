import React, {Component} from 'react'
import NavEditorChart from '../../components/nav-editor-chart/index'
import Table from '../../components/table/index'
import Chart from '../../components/chart/index'
import CostamizationEmptyTable from '../../components/costamization_empty_table'
import {
    FormSelect,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'elemental'

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
            modalIsOpen: false,
            inputSelect: "График",
            cancelButtonClicked: false,
            visibleButton: true,
            columns: [],
            showCostamization: true,
            data: []
        }
        this.createTable = this.createTable.bind(this)
        this.passDataToEditorChart = this.passDataToEditorChart.bind(this)
    }

    updateSelect(option) {
        this.setState({inputSelect: option});
    }

    createTable() {
        this.setState(prevState => ({
            showCostamization: !prevState.showCostamization,
            columns: []
        }));
    }

    getTarget(columns) {
        let arrayColumns = []
        columns.forEach(function(item) {
            arrayColumns.push(item.target)
        });
        return arrayColumns
    }

    passDataToEditorChart(data) {
        this.setState({data: data})
        console.log('page')
    }

    render() {
        return (
            <div>
                <NavEditorChart/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>

                        {this.state.showCostamization
                            ? <CostamizationEmptyTable createTable={this.createTable}/>
                            : <Table columns={this.state.columns} passDataToEditorChart={this.passDataToEditorChart}/>}

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
