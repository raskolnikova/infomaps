import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.less'

export default class Timeline extends Component {

    renderYears(visibleColumns){
          const listYears = visibleColumns.map((year) => 
               <li>{year}</li>
            );
            return  <ul className="timeline">{listYears}</ul>
    }

    render() {
        return (
           <div>
               {this.renderYears(this.props.visibleColumns)}
            </div>
        )
    }
}