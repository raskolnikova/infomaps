import React, {Component} from 'react'
import ItemDataset from '../item-dataset'

export default class ListDatasets extends Component {

  constructor() {
      super()

  }


    render() {
                return (
                    <div className='list-chart'>
                      {this.props.datasets.map(dataset => <ItemDataset  name={dataset.name} createdAt={dataset.createdAt}/>)}
                    </div>
            )
        }
    }
