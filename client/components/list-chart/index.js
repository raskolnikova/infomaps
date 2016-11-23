import React, {Component} from 'react';
import ItemChart from '../item-chart/index'

import './index.less'

export default class ListChart extends Component {

    render() {
        return (
            <div className='list-chart'>
                {
                  this.props.charts.map(chart => <ItemChart id={chart.id} name={chart.name} type={chart.type}/>)
                }
            </div>
        )

    }
}
