import React, {Component} from 'react';

import './index.less'

export default class ItemMap extends Component {

    render() {
        return (
            <div key={this.props.id}>
                <div className='button-map' >
                    <i className ='fa fa-map-marker fa-4x '></i>
                    <div className = 'inscription'>{this.props.name}</div>
                </div>
            </div>
        )

    }
}

ItemMap.propTypes = {
  name: React.PropTypes.string.isRequired,
};