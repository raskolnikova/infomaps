import React, {Component} from 'react';
import MapsPage from '../../pages/maps/index'
import EditorMapPage from '../../pages/editor-map/index'

export default class ContainerMap extends Component {

    constructor() {
        super();
        this.state = {
            isOpenEditMap: false,
            dataMap: {}
        }
    }

    getData(data) {
        this.setState({isOpenEditMap: true, dataMap: data})
    }

    handleClickNewMap() {
        this.setState({isOpenEditMap: true})
    }

    handleClickBackMap() {
        this.setState({isOpenEditMap: false, dataMap: {}})
    }

    render() {
        return (
            <div>
                {this.state.isOpenEditMap
                    ? <EditorMapPage dataMap={this.state.dataMap} clickBackMap={() => this.handleClickBackMap()}/>
                  : <MapsPage getDataMap={(data) => this.getData(data)} clickNewMap={() => this.handleClickNewMap()}/>
                }
            </div>
        )
    }
}
