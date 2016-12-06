import React, {Component} from 'react';
import Jquery from 'jquery/dist/jquery.min'
import Devextreme from 'devextreme/dist/js/dx.all'
import {Button} from 'elemental'

import './index.less'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

export default class Table extends Component {

    constructor() {
        super()
    }

    renderTable() {
        var column = this.props.columns
        var store = this.props.data;
        var self = this;

        $(function() {
            $("#gridContainer").dxDataGrid({
                dataSource: {
                    store: store
                },
                columns: column,
                paging: {
                    pageSize: 20
                },
                columnAutoWidth: true,
                editing: {
                    mode: 'batch',
                    allowUpdating: true,
                    allowAdding: true,
                    allowDeleting: true
                },
                onRowUpdated: function(info) {
                    self.props.passDataFromTableToEditorChart(store);
                }
            });
        });
    }

    componentDidMount() {
        this.renderTable()
    }

    render() {
        return (
            <div>
                <Button>Наборы данных</Button>
                <div className='dx-fieldset'>
                    <div id="textBox"></div>
                    <div id="addColumnButton"></div>
                    <div id="saveButton"></div>
                    <div id="gridContainer"></div>
                </div>
            </div>
        )
    }
}
