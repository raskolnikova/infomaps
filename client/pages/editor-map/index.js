import React, {Component} from 'react'
import NavEditorChart from '../../components/nav-editor-chart/index'
import Table from '../../components/table/index'
import Map from '../../components/map/index'
import CostamizationEmptyTable from '../../components/costamization_empty_table'
import {FormSelect} from 'elemental'

import './index.less'

export default class EditorMap extends Component {

    constructor()
    {
        super()
        this.state = {
            columns: [],
            showCostamization: true,
            data: [],
            visibleColumns: []
        }
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

    render() {
        return (
            <div>
                <NavEditorChart/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>
                        {this.state.showCostamization
                            ? <CostamizationEmptyTable createTable={(dataset) => this.createTable(dataset)}/>
                            : <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditorChart={(data, visibleColumns) => this.passDataFromTableToEditorChart(data, visibleColumns)}/>}

                    </div>
                    <Map/>
                </div>
            </div>
        )
    }
}
