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
            idChart:'',
            inputSelect: "График",
            columns: [],
            showCostamization: true,
            data: [],
            visibleColumns: [],
            nameChart: '',
            buttonSave: 'button_off',
            isUpdateChart: false
        }
    }

    handleGetChartById(id) {
        return ChartActions.getChartById(id);
    }

    handleChartUpdate() {
      console.log('update');
        if (this.state.buttonSave === 'button_on') {
            let chart = {
                type: this.state.inputSelect,
                file: this.state.data,
                visibleColumns: this.state.visibleColumns,
                name: this.state.nameChart,
                createdAt: new Date()
            }
            ChartActions.updateChart(this.state.idChart,chart);
            this.setState({buttonSave: 'button_off'})

        } else
            console.error('error save');
        }

    handleChartAdd() {
      console.log('create');

        if (this.state.buttonSave === 'button_on') {
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
        console.log(option);
        this.setState({inputSelect: option})
    }

    createTable(dataset) {
        this.setState(prevState => ({
            data: JSON.parse(dataset.file),
            showCostamization: !prevState.showCostamization,
            columns: this.getColumn(JSON.parse(dataset.file))
        }));
    }

    getColumn(data, visibleColumns) {
        let unvisibleColumns = [];
        let columns = [];

        for (let key in data[0])
            unvisibleColumns.push(key)
        if (visibleColumns !== undefined) {
            for (let i in data[0])
                for (let j in visibleColumns) {
                    if (i === visibleColumns[j]) {
                        unvisibleColumns.pop(i)
                    }
                    break;
                }
            for (let key in visibleColumns)
                columns.push(visibleColumns[key])
            for (let key in unvisibleColumns)
                columns.push({dataField: unvisibleColumns[key], visible: false})
            return columns
        } else
            return unvisibleColumns
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

    isEmptyObject(obj) {
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    getCostam() {
        if (this.isEmptyObject(this.props.dataChart)) { //для создания новой диаграммы
            if (this.state.showCostamization)
                return <CostamizationEmptyTable createTable={(dataset) => this.createTable(dataset)}/>
            else
                return <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditorChart={(data, visibleColumns) => this.passDataFromTableToEditorChart(data, visibleColumns)}/>
        } else { //для открытия уже существующей диаграммы
            this.state.idChart = this.props.dataChart.id
            this.state.nameChart = this.props.dataChart.name
            this.state.inputSelect = this.props.dataChart.type
            this.state.isUpdateChart = true;
            return <Table data={this.props.dataChart.file} columns={this.getColumn(this.props.dataChart.file, this.props.dataChart.visibleColumns)} passDataFromTableToEditorChart={(data, visibleColumns) => this.passDataFromTableToEditorChart(data, visibleColumns)}/>
        }
    }

    render() {
        return (
            <div>
                <NavEditorChart isChange={this.state.buttonSave} onChartAdd={this.state.isUpdateChart ? () => this.handleChartUpdate() : () => this.handleChartAdd()} clickBackChart={() => this.props.clickBackChart()}/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>
                        {this.getCostam()}
                    </div>
                    <div className="chart-wrap">
                        <div className="select">
                            <FormIconField width="one-fifth" iconPosition="left" iconKey="stop" iconColor={this.state.nameChart === ''
                                ? "danger"
                                : "success"}>
                                <FormInput placeholder="Введите название диаграммы" value ={this.props.dataChart.name} onChange={(e) => this.updateNameChart(e)}/>
                            </FormIconField>

                            <FormSelect options={controlCharts} onChange={(e) => this.updateSelect(e)}/> {/*  посмотри почему не меняется тип графика при открытии диаграммы*/}
                            <Chart data={this.state.data} visibleColumns={this.state.visibleColumns} typeChart={this.state.inputSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
