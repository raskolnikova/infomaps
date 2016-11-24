import React, {Component} from 'react'
import './index.less'

import NavBar from '../../components/navbar/index';
import Import from '../../components/import/index';

import DataSetActions from '../../action/DataSetAction'


export default class ImportPage extends Component {

  constructor() {
      super()

  }

  handleDataSetAdd(dataSet) {
         DataSetActions.createDataSet(dataSet);
     }


    render() {
                return (
                    <div>
                        <NavBar/>
                          <Import onDataSetAdd={this.handleDataSetAdd}/>
                    </div>
            )
        }
    }
