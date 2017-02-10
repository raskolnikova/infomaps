import React, {Component} from 'react'
import {Link} from 'react-router'

export default class NavEditorChart extends Component {
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

                    <div className='button' onClick= {()=>this.props.clickBackMap()}>
                        <div className='wrap-but'>
                            <i className="fa fa-bar-chart fa-3x"></i>
                            <div className='inscription'>К картам</div>
                        </div>
                    </div>

                <a onClick={this.props.onMapAdd}>
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
