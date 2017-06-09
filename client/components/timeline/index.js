import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.less'

export default class Timeline extends Component {


    findColumnInTimeline(visibleColumns, currentVisibleColumn) {
        for (let i = 0; i <=visibleColumns.length-1; i++) {
            if (visibleColumns[i] === currentVisibleColumn)
                return i;
        }
        return -1;
    }


    renderYears(visibleColumns, currentVisibleColumn) {
        let currentIndex = this.findColumnInTimeline(visibleColumns, currentVisibleColumn[0])
        const listYears = visibleColumns.map((year, i) => {
            if (i <= currentIndex)
                return <li key={year} className="active">{year}</li>
            else
                return <li key={year} className="disable">{year}</li>
        }
        );
        return <ul className="timeline">{listYears}</ul>
    }

    render() {
        return (
           <div>
               {this.renderYears(this.props.visibleColumns,this.props.currentVisibleColumn)}
            </div>
        )
    }
}