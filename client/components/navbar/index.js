import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.less'

export default class NavBar extends Component {

    constructor() {
        super()

    }

    handleDataSetAdd(dataSet) {
           DataSetActions.createDataSet(dataset);
       }


    render() {
        return (
            <nav className="flex-container">
                <Link to='/import'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-upload fa-3x"></i>
                            <div className='inscription'>Импорт</div>
                        </div>
                    </div>
                </Link>
                <Link to='/charts'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-bar-chart fa-3x"></i>
                            <div className='inscription'>Диаграммы</div>
                        </div>
                    </div>
                </Link>
                <Link to='/maps'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-upload fa-3x"></i>
                            <div className='inscription'>Карта</div>
                        </div>
                    </div>
                </Link>
            </nav>
        )
    }
}
