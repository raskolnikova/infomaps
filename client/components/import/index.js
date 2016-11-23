import React, {Component} from 'react';
import {Link} from 'react-router'

import './index.less'

export default class Import extends Component {
  constructor(){
    super();
    this.state={
      name:"obj1",
      createdAt: new Date()
    }
    this.handleDataSetAdd = this.handleDataSetAdd.bind(this)
  }

  handleDataSetAdd() {
       const newDataSet = {
           name: this.state.name,
           createdAt: this.state.createdAt
       };

       this.props.onDataSetAdd(newDataSet);
       this.setState({  name:"",createdAt: new Date()});
       console.log(this.state)
   }


    render() {
        return (
          <div className='import-container'>
              <button className='button-import' type="file" name="myfile"  onClick={this.handleDataSetAdd}>
                  <i className="fa fa-plus fa-4x"></i>
                  <div className='inscription'>JSON</div>
              </button>

              <button className='button-import'>
                  <i className="fa fa-plus fa-4x"></i>
                  <div className='inscription'>CSV</div>
              </button>
        </div>
        )
    }
}
