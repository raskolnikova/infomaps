import React, {Component} from 'react';
import {Link} from 'react-router'

import './index.less'

export default class NewChart extends Component {
    render() {
        return (
            <Link to='/editor-chart'>
                <div className='button-new-chart'>
                    <i className="fa fa-plus fa-4x"></i>
                    <div className='inscription'>Cоздать новую диаграмму</div>
                </div>
            </Link>
        )

    }
}
