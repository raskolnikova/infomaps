import React, {Component} from 'react'
import NavEditorMap from '../../components/nav-editor-map/index'
import Table from '../../components/table/index'
import Map from '../../components/map/index'
import CostamizationEmptyTable from '../../components/costamization_empty_table'
import AdditionalCostamMap from '../../components/additional_costam_map'
import {FormSelect, FormInput, FormIconField, Button} from 'elemental'

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
];

const ColorSchemes = [
    {
        label: 'Цветовая схема 1',
        value: '0'
    }, {
        label: 'Цветовая схема 2',
        value: '1'
    }, {
        label: 'Цветовая схема 3',
        value: '2'
    },
    {
        label: 'Цветовая схема 4',
        value: '3'
    }
];


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
            notice:'',
            buttonSave: 'button_off',
            isUpdateMap: false,
            isAddNotice: false,
            dataForMap: {
              'ISO3Column':'',
              'data': [],
              'visibleColumns':[],
              'colorScheme': 0,
              'domen':[1000000,100000,10000,1000,100,10]
            }
        }
    }

    handleGetMapById(id) {
        return MapActions.getMapById(id);
    }

    handleMapUpdate() {
        if (this.state.buttonSave === 'button_on') {
            let map = {
                type: this.state.inputSelect,
                data: this.state.data,
                visibleColumns: this.state.visibleColumns,
                name: this.state.nameMap,
                colorSchema: this.state.dataForMap.colorScheme,
                ISO3Column:this.state.dataForMap.ISO3Column,
                domen:this.state.dataForMap.domen,
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
                data: this.state.data,
                visibleColumns: this.state.visibleColumns,
                name: this.state.nameMap,
                colorSchema: this.state.dataForMap.colorScheme,
                ISO3Column:this.state.dataForMap.ISO3Column,
                domen:this.state.dataForMap.domen,
                createdAt: new Date(),
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

    updateNameMap(e) {
        if (e.target.value !== '')
            this.setState({nameMap: e.target.value, buttonSave: 'button_on'})
        else
            this.setState({nameMap: '', buttonSave: 'button_off'})
    }

     updateNotice(e) {
            this.setState({notice: e.target.value})
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
                return <div>
                    <AdditionalCostamMap
                      handleColoringMap={(columnName,domen,colorScheme) => this.handleColoringMap(columnName,domen,colorScheme)}
                      ColorScheme={ColorSchemes}
                      updateColorSchemes={(e) => this.updateSelectColorScheme(e)}
                      />
                    <Table data={this.state.data} columns={this.state.columns} passDataFromTableToEditor={(data, visibleColumns) => this.passDataFromTableToEditor(data, visibleColumns)}/>
                </div>
        } else { //для открытия уже существующей карты
            this.state.idMap = this.props.dataMap.id
            this.state.nameMap = this.props.dataMap.name
            this.state.inputSelect = this.props.dataMap.type
            this.state.isUpdateMap = true;
            this.state.data = this.props.dataMap.data;
            this.state.dataForMap =  {
              'ISO3Column':this.props.dataMap.ISO3Column,
              'data': this.props.dataMap.data,
              'visibleColumns':this.props.dataMap.visibleColumns,
              'colorScheme': this.props.dataMap.colorSchema,
              'domen':this.props.dataMap.domen
            }
           
            return <div>
                <AdditionalCostamMap handleColoringMap={(columnName,domen,colorScheme) => this.handleColoringMap(columnName,domen,colorScheme)}
                                        ColorScheme={ColorSchemes}
                                        updateColorSchemes={(e) => this.updateSelectColorScheme(e)} />
                <Table data={this.props.dataMap.data} columns={this.getColumn(this.props.dataMap.data, this.props.dataMap.visibleColumns)} passDataFromTableToEditor={(data, visibleColumns) => this.passDataFromTableToEditor(data, visibleColumns)}/>
            </div>
        }
    }

    passDataFromTableToEditor(data, visibleColumns) {
        this.setState({data: data, visibleColumns: visibleColumns})
    }

    handleAddNotice() {
        this.setState({isAddNotice: true})
    }

    handleColoringMap(columnName, domen, colorScheme) {
        let dataForMap = {
            'ISO3Column': columnName,
            'data': this.state.data,
            'visibleColumns': this.state.visibleColumns,
            'colorScheme': colorScheme,
            'domen': domen
        }
        this.setState({ dataForMap: dataForMap })
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
                            <FormSelect options={controlMaps} onChange={(e) => this.updateSelect(e)}/>
                            <FormIconField width="one-fifth" iconPosition="left" iconKey="stop" iconColor={this.state.nameMap === ''
                                ? "danger"
                                : "success"}>
                                <FormInput placeholder="Введите название карты" value ={this.props.dataMap.name} onChange={(e) => this.updateNameMap(e)}/>
                            </FormIconField>
                            {this.state.isAddNotice
                                ? <FormInput placeholder="Введите текст" value ={this.props.dataMap.name} onChange={(e) => this.updateNotice(e)}/>
                                : <Button type="success" onClick={() => this.handleAddNotice()}>Добавить примечание</Button>
}
                            <Map id_map="map_edit" dataForMap={this.state.dataForMap} typeMap={this.state.inputSelect} isUpdateMap={this.state.isUpdateMap} notice={this.state.notice} />
                        </div>
                    </div>
                </div>
            )
        }
    }
