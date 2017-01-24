import React, {Component} from 'react'
import {Link} from 'react-router'

import './index.less'

export default class NavEditorChart extends Component {
    constructor() {
        super()
    }


    render() {
        return (
            <nav className="nav-editor-chart-container">
                <Link to='/'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-home fa-3x"></i>
                            <div className='inscription'>На главную</div>
                        </div>
                    </div>
                </Link>
                <Link to='/charts'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-bar-chart fa-3x"></i>
                            <div className='inscription'>К диаграммам</div>
                        </div>
                    </div>
                </Link>
                <a onClick={this.props.onChartAdd}>
                    <div className = {'button ' + this.props.isChange} >
                        <div className='wrap-but'>
                            <i className="fa fa-save fa-3x"></i>
                            <div className='inscription'>Сохранить</div>
                        </div>
                    </div>
                </a>
            </nav>
        )
    }
}
