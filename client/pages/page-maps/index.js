import React, {Component} from 'react';
import NavBar from '../../components/navbar'
import NewMap from '../../components/new-map'
import ListMaps from '../../components/list-maps'

import './index.less'

const maps = [
    {
        id: 1,
        name: 'Население стран за 2013 год',
    }, {
        id: 2,
        name: 'Население стран за 2014 год',
    }, {
        id: 3,
        name: 'Население стран за 2015 год',
    }
];

export default class PageMaps extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='charts-container'>
                    <NewMap/>
                    <ListMaps maps={maps}/>
                </div>
            </div>
        )

    }
}
