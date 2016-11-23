import React, {Component} from 'react'
import NavEditorChart from '../../components/nav-editor-chart/index'
import Table from '../../components/table/index'
import Chart from '../../components/chart/index'
import {FormSelect} from 'elemental'

import './index.less'

const controlCharts = [
    {
        label: 'Гистограмма',
        value: 'Гистограмма'
    }, {
        label: 'График',
        value: 'График'
    }, {
        label: 'Круговая диаграмма',
        value: 'Круговая диаграмма'
    }, {
        label: 'Диаграмма с областями',
        value: 'Диаграмма с областями'
    }, {
        label: 'Пузырьковая диаграмма',
        value: 'Пузырьковая диаграмма'
    }, {
        label: 'Лепестковая диаграмма',
        value: 'Лепестковая диаграмма'
    }, {
        label: 'Полярная диаграмма',
        value: 'Полярная диаграмма'
    }
]

export default class EditorChart extends Component {

    updateSelect(option) {
        this.setState({inputSelect: option});
    }

    render() {
        return (
            <div>
                <NavEditorChart/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>
                        <Table/>
                    </div>
                    <div className="chart-wrap">
                    <div className="select">
                        <FormSelect options={controlCharts}  onChange={this.handleSelect}/>
                        <Chart/>
</div>
                    </div>
                </div>
            </div>
        )
    }
}
