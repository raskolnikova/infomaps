import React, { Component } from 'react';
import Jquery from 'jquery/dist/jquery.min'
import Devextreme from 'devextreme/dist/js/dx.all'

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
                columnAutoWidth: true,
                editing: {
                    mode: 'batch',
                    allowUpdating: true,
                    allowAdding: true,
                    allowDeleting: true
                },
                columnChooser: {
                    enabled: true,
                    height: 300,
                    width: 400,
                    emptyPanelText: 'Снимите галочку с ненужных столбцов',
                    mode: 'select'
                },
                paging: {
                    enabled: false

                },
                sorting: { mode: 'multiple' },
                onRowUpdated: function(info) {
                    self.props.passDataFromTableToEditor(store, self.getVisibleColumns(), self.getSortedColumn());
                },
                onContentReady: function(info) {
                    self.props.passDataFromTableToEditor(store, self.getVisibleColumns(), self.getSortedColumn());
                }
            });
        });
    }

    getVisibleColumns() {
        let grid = $("#gridContainer").dxDataGrid("instance");
        let columns = [];
        for (var i = 0; i < grid.columnCount(); i++) {
            if (grid.columnOption(i, "visible"))
                columns.push(grid.columnOption(i, "dataField"))
        }
        return columns
    }

    getSortedColumn() {
        let grid = $("#gridContainer").dxDataGrid("instance");
        let columns = []

        for (var i = 0; i < grid.columnCount(); i++) {
            if (grid.columnOption(i, "visible"))
                if (grid.columnOption(i, 'sortOrder') !== undefined) {
                    columns = [grid.columnOption(i, "dataField"), grid.columnOption(i, 'sortOrder')]
                }
        }
        return columns
    }

    componentDidMount() {
        this.renderTable()
    }

    render() {
        return ( <div>
            <div className = 'dx-fieldset' >
            <div id = "textBox" > 
            </div> <div id = "addColumnButton" > </div> <div id = "saveButton" > </div> <div id = "gridContainer" > </div> 
            </div> </div>
        )
    }
}