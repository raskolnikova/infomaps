import React, {Component} from 'react'
import './index.less'

import NavBar from '../../components/navbar/index';
import Import from '../../components/import/index';
import ListDatasets from '../../components/list-datasets/'

import DatasetStore from './../../stores/DataSetStore'
import DatasetActions from '../../action/DataSetAction'


function getStateFromFlux() {
  return {isLoading: DatasetStore.isLoading(), dataset: DatasetStore.getDatasets()};
}

export default class DatasetsPage extends Component {

     constructor() {
       super()
        this.state = getStateFromFlux();
        this._onChange = this._onChange.bind(this)
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

    handleDatasetGet(dataset){
      console.log(dataset);
      // this.props.createTable(dataset)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="datasets-container">
                    <Import onDatasetAdd={this.handleDatasetAdd}/>
                    <ListDatasets datasets={this.state.dataset} onDatasetDelete={this.handleDatasetDelete} onDatasetGet={this.handleDatasetGet}/>
                </div>
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux())
    }

};
