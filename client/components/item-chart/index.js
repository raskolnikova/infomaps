import React, {Component} from 'react';
import {Link} from 'react-router'

import './index.less'


export default class ItemChart extends Component {

    getIcon(type) {
        switch (type) {
            case 'Гистограмма':
                return 'bar-chart'
                break;
            case 'График':
                return 'line-chart'
                break;
            case 'Круговая диаграмма':
                return 'pie-chart'
                break;
            case 'Кольцевая диаграмма':
                return 'area-chart'
                break;
            case 'bubule-chart':
                return 'circle'
                break;
            case 'radar-chart':
                return 'object-ungroup'
                break;
            case 'polar-chart':
                return 'circle-o'
                break;
            default:
                return 'question'
        }
    }

    render() {

        return (
            <div>
                <div className='button-chart'>
                    <div className="delete_dataset">
                        <i className='fa fa-times' onClick={this.props.onDelete}></i>
                    </div>
                    <i className ={'fa fa-' + this.getIcon(this.props.type) + ' fa-4x'}></i>

                    <div className='inscription' onClick={this.props.onOpen}>
                        {this.props.name}
                    </div>

                </div>
            </div>
        )

    }
}

ItemChart.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired

};
