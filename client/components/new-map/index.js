import React, {Component} from 'react';
import {Link} from 'react-router'

import './index.less'

export default class NewMap extends Component {
    render() {
        return (
            <Link to='/editor-map'>
                <div className='button-new-chart'>
                    <i className="fa fa-plus fa-4x"></i>
                    <div className='inscription'>Cоздать новую карту</div>
                </div>
            </Link>
        )

    }
}
