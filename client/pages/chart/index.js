import React, {Component} from 'react';
import NavBar from '../../components/navbar'
import NewChart from '../../components/new-chart'
import ListChart from '../../components/list-chart'

import './index.less'

const charts = [
    {
        id: 1,
        name: 'Уровень дохода населения РФ за 2010-2015',
        type: 'bar-chart'
    }, {
        id: 2,
        name: 'Уровень дохода населения РФ за 2011-2015',
        type: 'line-chart'
    }, {
        id: 3,
        name: 'Уровень дохода населения РФ за 2012-2015',
        type: 'pie-chart'
    }, {
        id: 4,
        name: 'Уровень дохода населения РФ за 2013-2015',
        type: 'area-chart'
    }
];

export default class Charts extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='charts-container'>
                    <NewChart/>
                    <ListChart charts={charts}/>
                </div>
            </div>
        )

    }
}
