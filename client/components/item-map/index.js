import React, {Component} from 'react';
import './index.less'

export default class ItemMap extends Component {

    render() {
        return (
                <div className='button-map' >
                <div className="delete_dataset">
                        <i className='fa fa-times' onClick={this.props.onDelete}></i>
                    </div>
                    <i className ='fa fa-map-marker fa-4x '></i>
                    <div className = 'inscription' onClick={this.props.onOpen}>{this.props.name}</div>
                </div>
        )

    }
}


