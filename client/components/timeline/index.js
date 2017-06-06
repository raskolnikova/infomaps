import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.less'

export default class Timeline extends Component {

    render() {
        return (
            <ul className="timeline">
                <li>2010</li>
                <li>2011</li>
                <li>2012</li>
                <li>2013</li>
                <li>2014</li>
            </ul>
        )
    }
}