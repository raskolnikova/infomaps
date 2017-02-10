import React, {Component} from 'react';
import './index.less'
import flexboxgrid from 'flexboxgrid'


export default class ItemDataset extends Component {

getFormatDate(date){
  let newDate = new Date(date)
 const month = newDate.getMonth()+1
  const day = newDate.getDate()
  const year = newDate.getFullYear()
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
const fullTime = day+"."+month+"."+year+" "+hours+":"+minutes
  return fullTime
}

    render() {
        return (
            <div className='button-chart col-xs-8
                col-sm-6
                col-md-4
                col-lg-2' >
              <div className="delete_dataset">
                <i className ='fa fa-times' onClick={this.props.onDelete}></i>
                </div>

                <div className='inscription' onClick={this.props.onDatasetGet}>{this.props.name}</div>
                <div>{this.getFormatDate(this.props.createdAt)}</div>
            </div>
        )

    }
}
