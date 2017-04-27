import React, {Component} from 'react';
//import './index.less'


export default class ItemScript extends Component {

    render() {
        return (
            <div className='button-chart' >
              <div className="delete_dataset">
                <i className ='fa fa-times'  onClick={this.props.onDelete}></i>
                </div>
               <i className ='fa fa-book fa-4x'></i>

                <div className='inscription'>{this.props.name}</div>
            </div>
        )

    }
}
