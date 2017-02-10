import React, {Component} from 'react'
import NavEditorMap from '../../components/nav-editor-map/index'
import Table from '../../components/table/index'
import Map from '../../components/map/index'
import CostamizationEmptyTable from '../../components/costamization_empty_table'
import {FormSelect, FormInput, FormIconField} from 'elemental'

import MapActions from '../../action/MapAction.js'

import './index.less'

const controlMaps = [
    {
        label: 'Карта мира',
        value: 'Карта мира'
    }, {
        label: 'Карта США',
        value: 'Карта США'
    }, {
        label: 'Карта России',
        value: 'Карта России'
    }
]

export default class EditorMap extends Component {

    constructor()
    {
        super()
        this.state = {
            idMap: '',
            inputSelect: "Карта мира",
            columns: [],
            showCostamization: true,
            data: [],
            visibleColumns: [],
            nameMap: '',
            buttonSave: 'button_off',
            isUpdateMap: false
        }
    }

    handleGetMapById(id) {
        return MapActions.getMapById(id);
    }

    handleMapUpdate() {
        if (this.state.buttonSave === 'button_on') {
            let map = {
                type: this.state.inputSelect,
                dataFile: this.state.data,
                visibleColumns: this.state.visibleColumns,
                name: this.state.nameMap,
                colorSchema: [],
                createdAt: new Date()
            }
            MapActions.updateMap(this.state.idMap, map);
            this.setState({buttonSave: 'button_off'})

        } else
            console.error('error save map');
        }

    handleMapAdd() {
        if (this.state.buttonSave === 'button_on') {
            let map = {
                type: this.state.inputSelect,
                dataFile: this.state.data,
                visibleColumns: this.state.visibleColumns,
                name: this.state.nameMap,
                colorSchema: [],
                createdAt: new Date()
            }
            MapActions.createMap(map);
            this.setState({buttonSave: 'button_off'})

        } else
            console.error('error save map');
        }

    updateSelect(option) {
        this.setState({inputSelect: option})
    }

    createTable(dataset) {
        this.setState(prevState => ({
            dataFile: JSON.parse(dataset.file),
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

    updateNameMap(e) {
        if (e.target.value !== '')
            this.setState({nameMap: e.target.value, buttonSave: 'button_on'})
        else
            this.setState({nameMap: '', buttonSave: 'button_off'})
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
        if (this.isEmptyObject(this.props.dataMap)) { //для создания новой карты
            if (this.state.showCostamization)
                return <CostamizationEmptyTable createTable={(dataset) => this.createTable(dataset)}/>
            else
                return <Table data={this.state.dataFile} columns={this.state.columns} passDataFromTableToEditorMap={(dataFile, visibleColumns) => this.passDataFromTableToEditorMap(dataFile, visibleColumns)}/>
        } else { //для открытия уже существующей карты
            this.state.idMap = this.props.dataMap.id
            this.state.nameMap = this.props.dataMap.name
            this.state.inputSelect = this.props.dataMap.type
            this.state.isUpdateMap = true;
            this.state.dataFile = this.props.dataMap.dataFile;
            return <Table data={this.props.dataMap.dataFile} columns={this.getColumn(this.props.dataMap.dataFile, this.props.dataMap.visibleColumns)} passDataFromTableToEditorMap={(dataFile, visibleColumns) => this.passDataFromTableToEditorMap(dataFile, visibleColumns)}/>
        }
    }

    passDataFromTableToEditorMap(data, visibleColumns) {
        this.setState({data: data, visibleColumns: visibleColumns})
    }

    render() {
        return (
            <div>
                <NavEditorMap isChange={this.state.buttonSave} onMapAdd={this.state.isUpdateMap
                    ? () => this.handleMapUpdate()
                    : () => this.handleMapAdd()} clickBackMap={() => this.props.clickBackMap()}/>
                <div className='editor-wrap'>
                    <div className="table-wrap" id='dev-table'>
                        {this.getCostam()}
                    </div>
                    <div className="select">
                        <FormIconField width="one-fifth" iconPosition="left" iconKey="stop" iconColor={this.state.nameMap === ''
                            ? "danger"
                            : "success"}>
                            <FormInput placeholder="Введите название диаграммы" value ={this.props.dataMap.name} onChange={(e) => this.updateNameMap(e)}/>
                        </FormIconField>

                        <FormSelect options={controlMaps} onChange={(e) => this.updateSelect(e)}/> {/*  посмотри почему не меняется тип графика при открытии диаграммы*/}
                        <Map id_map="map_edit" data={this.state.dataFile} visibleColumns={this.state.visibleColumns} typeMap={this.state.inputSelect} isUpdateMap={this.state.isUpdateMap}/>
                    </div>
                </div>
            </div>
        )
    }
}
