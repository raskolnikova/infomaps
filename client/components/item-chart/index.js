import React, {Component} from 'react';

import './index.less'

export default class ItemChart extends Component {

    getIcon(type) {
        switch (type) {
            case 'bar-chart':
                return 'bar-chart'
                break;
            case 'line-chart':
                return 'line-chart'
                break;
            case 'pie-chart':
                return 'pie-chart'
                break;
            case 'area-chart':
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
            <div key={this.props.id}>
                <div className='button-chart' >
                    <i className ={'fa fa-'+this.getIcon(this.props.type)+' fa-4x'}></i>
                    <div className = 'inscription'>{this.props.name}</div>
                </div>
            </div>
        )

    }
}

ItemChart.propTypes = {
  name: React.PropTypes.string.isRequired,
  type:  React.PropTypes.string.isRequired
};
