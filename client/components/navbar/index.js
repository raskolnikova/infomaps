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
                <Link to='/datasets'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-file-text fa-3x"></i>
                            <div className='inscription'>Наборы данных</div>
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
                <Link to='/page-maps'>
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
