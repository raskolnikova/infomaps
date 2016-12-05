import React, {Component} from 'react';
import Jquery from 'jquery/dist/jquery.min'
import Devextreme from 'devextreme/dist/js/dx.all'
import {FormSelect, Button} from 'elemental'

import './index.less'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

var myArray = [
    {
        Name: "Andrew Fuller",
        City: "San Marino",
        Phone: 545
    }, {
        Name: "Nancy Davolio",
        City: "Glendale",
        Phone: 874
    }, {
        Name: "Steven Buchanan",
        City: "Chatsworth",
        Phone: 6565
    }, {
        Name: "Janet Leverling",
        City: "Pasadena",
        Phone: 58485
    }, {
        Name: "Margaret Peacock",
        City: "Los Angeles",
        Phone: 300
    }
];

export default class Table extends Component {

    constructor() {
        super()
        this.state = {
            data: []
        }
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

    // formatData(columns) {
    //     let data = [];
    //     let obj = {}
    //     columns.forEach(function(item) {
    //         obj[item] = ''
    //     });
    //     data.push(obj)
    //     return data
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(this.state.data)
    //     console.log(prevState.data)
    //
    //     // if (this.state.data != this.prevState.data)
    //     //     this.props.passDataToEditorChart(this.state.data)
    // }



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
                    self.props.passDataToEditorChart(store);
                }
            });
        });
    }

    componentDidMount() {
        this.renderTable()
    }

}
