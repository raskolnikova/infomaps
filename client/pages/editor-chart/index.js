import React, {Component} from 'react'
import NavEditorChart from '../../components/nav-editor-chart/index'
import Table from '../../components/table/index'
import Chart from '../../components/chart/index'
import CostamizationEmptyTable from '../../components/costamization_empty_table'
import {FormSelect, FormInput, FormIconField} from 'elemental'

import ChartActions from '../../action/ChartAction'

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
            visibleColumns: [],
            nameChart: '',
            buttonSave: 'button_off'
        }
    }

    handleGetChartById(id) {
      return  ChartActions.getChartById(id);
    }

    handleChartAdd(data) {
        if (data.buttonSave === 'button_on') {
            let chart = {
                type: this.state.inputSelect,
                file: this.state.data,
                visibleColumns: this.state.visibleColumns,
                name: this.state.nameChart,
                createdAt: new Date()
            }
            ChartActions.createChart(chart);
            this.setState({buttonSave: 'button_off'})

        } else
            console.error('error save');
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

    passDataFromTableToEditorChart(data, visibleColumns) {
        this.setState({data: data, visibleColumns: visibleColumns})
    }

    updateNameChart(e) {
        if (e.target.value !== '')
            this.setState({nameChart: e.target.value, buttonSave: 'button_on'})
        else
            this.setState({nameChart: '', buttonSave: 'button_off'})

    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    getCostam() {
        if (this.state.showCostamization && this.isEmpty(this.props.location.query))
            return <CostamizationEmptyTable createTable={(dataset) => this.createTable(dataset)}/>
        else if (!this.isEmpty(this.props.location.query)) {
          //  console.log(this.handleGetChartById(this.props.location.query.id))
            return <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditorChart={(data, visibleColumns) => this.passDataFromTableToEditorChart(data, visibleColumns)}/>
        } else
            return <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditorChart={(data, visibleColumns) => this.passDataFromTableToEditorChart(data, visibleColumns)}/>
}

render() {
    return (
        <div>
            <NavEditorChart isChange={this.state.buttonSave} onChartAdd={(chart) => this.handleChartAdd(this.state)}/>
            <div className='editor-wrap'>
                <div className="table-wrap" id='dev-table'>
                    {this.getCostam()}
                </div>
                <div className="chart-wrap">
                    <div className="select">
                        <FormIconField width="one-fifth" iconPosition="left" iconKey="stop" iconColor={this.state.nameChart === ''
                            ? "danger"
                            : "success"}>
                            <FormInput placeholder="Введите название диаграммы" onChange={(e) => this.updateNameChart(e)}/>
                        </FormIconField>

                        <FormSelect options={controlCharts} onChange={(e) => this.updateSelect(e)}/>
                        <Chart data={this.state.data} visibleColumns={this.state.visibleColumns} typeChart={this.state.inputSelect}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
