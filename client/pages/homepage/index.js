import React, {Component} from 'react'

import NavBar from '../../components/navbar/index';
import Welcome from '../../components/welcome/index';


export default class HomePage extends Component {

    render() {
                return (
                    <div>
                        <NavBar/>
                        <Welcome/>
                    </div>
            )
        }
    }
