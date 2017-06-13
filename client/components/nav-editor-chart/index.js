import React, {Component} from 'react'
import {Link} from 'react-router'

import './index.less'

export default class NavEditorChart extends Component {

    render() {
        return (
            <nav className="nav-editor-chart-container">
                <Link to='/constructor'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-home fa-3x"></i>
                            <div className='inscription'>На главную</div>
                        </div>
                    </div>
                </Link>

                    <div className='button' onClick= {()=>this.props.clickBackChart()}>
                        <div className='wrap-but'>
                            <i className="fa fa-bar-chart fa-3x"></i>
                            <div className='inscription'>К диаграммам</div>
                        </div>
                    </div>

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
