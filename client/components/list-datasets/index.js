import React, {Component} from 'react'
import ItemDataset from '../item-dataset'

export default class ListDatasets extends Component {

    render() {
                return (
                    <div className='list-chart'>
                      {this.props.datasets.map(dataset => <ItemDataset
                        name={dataset.name}
                        createdAt={dataset.createdAt}
                        onDelete={this.props.onDatasetDelete.bind(null,dataset)}
                        onDatasetGet={this.props.onDatasetGet.bind(null,dataset)}
                          />)}
                    </div>
            )
        }
    }
