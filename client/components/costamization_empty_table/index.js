import React, {Component} from 'react';
import {Form, FormField, FormInput, Button} from 'elemental'
import Import from '../../components/import/index';
import ListDatasets from '../../components/list-datasets/'

import DatasetStore from './../../stores/DataSetStore'
import DatasetActions from '../../action/DataSetAction'


function getStateFromFlux() {
  return {isLoading: DatasetStore.isLoading(), dataset: DatasetStore.getDatasets()};
}

export default class CostamizationEmptyTable extends Component {
    constructor() {
        super()
        this.state = getStateFromFlux();
        this.addColumn = this.addColumn.bind(this);
        this._onChange = this._onChange.bind(this)
    }

    addColumn() {
        //я знаю, что нельзя напрямую изменять состояние, но по другому не работает
        const id = this.state.inputs.length + 1;
        this.state.inputs.push({id: id, target: ''})
        this.setState(this.state)
    }

    handleChange(event, id) {
        this.state.inputs[id - 1].target = event.target.value;
        this.setState(this.state)

    }

    componentWillMount() {
        DatasetActions.loadDataset();
    }

    componentDidMount() {
        DatasetStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        DatasetStore.removeChangeListener(this._onChange);
    }

    handleDatasetDelete(dataset) {
        DatasetActions.deleteDataset(dataset.id);
    }

    handleDatasetAdd(dataset) {
        DatasetActions.createDataset(dataset);
    }

    render() {
        return (
            <div>
                <div className="datasets-container">
                    <Import onDatasetAdd={this.handleDatasetAdd}/>
                    <ListDatasets datasets={this.state.dataset} onDatasetDelete={this.handleDatasetDelete} onDatasetGet={this.props.createTable}/>
                </div>

            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }
}
