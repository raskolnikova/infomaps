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

    constructor()
    {
        super()
        this.state = {
            modalIsOpen: true,
            cancelButtonClicked: false,
            visibleButton: true,
            showCostamization: true,
            columns: []
        }

        this.modalOpen = this.modalOpen.bind(this)
        this.cancelButtonClicked = this.cancelButtonClicked.bind(this)
        this.resetCancelButtonClicked = this.resetCancelButtonClicked.bind(this)
        this.createTable = this.createTable.bind(this)
    }

    updateSelect(option) {
        this.setState({inputSelect: option});
    }

    modalOpen() {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }));
    }

    cancelButtonClicked() {
        return this.state.cancelButtonClicked;
    }

    resetCancelButtonClicked() {
        this.setState({cancelButtonClicked: false});
    }

    createTable(columns) {
        this.setState(prevState => ({
            showCostamization: !prevState.showCostamization,
            columns: this.getTarget(columns)
        }));
    }

    getTarget(columns) {
        let arrayColumns = []
        columns.forEach(function(item) {
            arrayColumns.push(item.target)
        });
        return arrayColumns
    }

    render() {
        return (
            <div>
                <NavEditorChart/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>

                        {this.state.showCostamization
                            ? <CostamizationEmptyTable createTable={this.createTable}/>
                            : <Table columns={this.state.columns}/>}

                    </div>
                    <div className="chart-wrap">
                        <div className="select">
                            <FormSelect options={controlCharts} onChange={this.handleSelect}/>
                            <Chart/>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.modalIsOpen} onCancel={this.modalOpen} backdropClosesModal>
                    <ModalHeader text="Выберете одно из действий для привязки диаграммы и набора данных"/>
                    <ModalBody>
                        <Button onClick={this.modalOpen}>Создать пустую таблицу</Button>
                        <Button>Импортировать набор данных</Button>
                        <Button>Выбрать из библиотеки набора данных</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
