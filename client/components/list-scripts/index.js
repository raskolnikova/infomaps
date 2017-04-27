import React, {Component} from 'react'
import ItemScript from '../item-script'
import './index.less'

export default class ListScripts extends Component {

    render() {
                return (
                    
                    <div className='list-chart '>
                      {this.props.scripts.map(script => <ItemScript
                           onDelete={this.props.onScriptDelete.bind(null,script)}
                        key = {script.id}
                        name={script.name}
                          />)}
                    </div>
            )
        }
    }
