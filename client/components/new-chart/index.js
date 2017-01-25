import React, {Component} from 'react';
import {Link} from 'react-router'

import './index.less'

export default class NewChart extends Component {
    render() {
        return (
                <div className='button-new-chart' onClick = {() => this.props.clickNewChart()}>
                    <i className="fa fa-plus fa-4x"></i>
                    <div className='inscription'>Cоздать новую диаграмму</div>
                </div>
        )

    }
}
