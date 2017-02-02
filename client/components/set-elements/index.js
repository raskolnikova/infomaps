import React, {Component} from 'react';
import './index.less'


export default class SetElements extends Component {

    render() {
        return (
            <nav className="set-elements-container">
                    <div className='element' onClick={(typeList) => this.props.handleChangeSetElements('charts')}>
                        <div className='wrap-elem'>
                            <i className="fa fa-bar-chart fa-3x"></i>
                            <div className='inscription'>Диаграммы</div>
                        </div>
                    </div>
                    <div className='element'>
                        <div className='wrap-elem'>
                            <i className="fa  fa-map-o fa-3x"></i>
                            <div className='inscription'>Карты</div>
                        </div>
                    </div>
                    <div className='element'>
                        <div className='wrap-elem'>
                            <i className="fa fa-font fa-3x"></i>
                            <div className='inscription'>Текст</div>
                        </div>
                    </div>
            </nav>
        )
    }
}
