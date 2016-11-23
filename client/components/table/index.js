import React, {Component} from 'react';
import Jquery from 'jquery/dist/jquery.min'
import Devextreme from 'devextreme/dist/js/dx.all'
import {FormSelect} from 'elemental'

import './index.less'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';



const controlData = [
    {
        label: 'Данные 1',
        value: 'Данные 1'
    }, {
        label: 'Данные 2',
        value: 'Данные 2'
    }, {
        label: 'Данные 3',
        value: 'Данные 3'
    }
]

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

    render() {
        return (
            <div>
                <FormSelect options={controlData} onChange={this.handleSelect}/>
                <div className='dx-fieldset'>
                  <div id="gridContainer"></div>
                </div>
            </div>
        )

    }

    componentDidMount() {

        var exemple = $(function() {
            $("#gridContainer").dxDataGrid({
                dataSource: myArray,
                columns: ['Name', 'City', 'Phone'],
                paging: { pageSize: 20},
       columnAutoWidth: true,
       editing: {
            mode: 'batch',
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true
        }
            });
        });

        // do the old-school stuff

        // start a new React render tree with our node and the children
        // passed in from above, this is the other side of the portal.
    }

}
