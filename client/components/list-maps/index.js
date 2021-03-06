import React, {Component} from 'react';
import ItemMap from '../item-map/index'

import './index.less'

export default class ListMaps extends Component {

    render() {
        return (
                <div className='list-map'>
                    {this.props.maps.map(map => <ItemMap key={map.id} name={map.name}
                    onDelete={this.props.onMapDelete.bind(null,map)}
                    onOpen={this.props.onOpenMap.bind(null,map)}
                  />)
}
                </div>
        )

    }
}
