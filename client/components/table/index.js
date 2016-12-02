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
        Phone: "(626) 555-0358"
    }, {
        Name: "Nancy Davolio",
        City: "Glendale",
        Phone: "(818) 555-9248"
    }, {
        Name: "Steven Buchanan",
        City: "Chatsworth",
        Phone: "(818) 555-8872"
    }, {
        Name: "Janet Leverling",
        City: "Pasadena",
        Phone: "(626) 555-0281"
    }, {
        Name: "Margaret Peacock",
        City: "Los Angeles",
        Phone: "(213) 555-7098"
    }
];

export default class Table extends Component {

    constructor() {
        super()
        this.state = {
            columns: []
        }
    }

    render() {
        return (
            <div>
                <Button>Наборы данных</Button>
                <div className='dx-fieldset'>
                    <div id="gridContainer"></div>
                </div>
            </div>
        )

    }

    componentDidMount() {
        var columns = this.props.columns
        var exemple = $(function() {
            $("#gridContainer").dxDataGrid({
                dataSource: myArray,
                columns: columns,
                paging: {
                    pageSize: 20
                },
                columnAutoWidth: true,
                editing: {
                    mode: 'batch',
                    allowUpdating: true,
                    allowAdding: true,
                    allowDeleting: true
                }
            });
        });

    }

}
