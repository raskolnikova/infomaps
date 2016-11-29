import React, {Component} from 'react';

import './index.less'

export default class ItemDataset extends Component {

    render() {
        return (
            <div className='button-chart'>
                <div className='inscription'>{this.props.name}</div>
                <div>{this.props.createdAt}</div>
            </div>
        )

    }
}
