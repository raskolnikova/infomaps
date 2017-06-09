import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.less'

export default class Player extends Component {

    render() {
        return (
            <div className="player">
                <div className='player_but'>
                    <i className="fa fa-backward fa-3x" aria-hidden="true"></i>
                </div>            
                <div className='player_but'  onClick={this.props.onPlay}>
                    <i className="fa fa-play fa-3x" aria-hidden="true"></i>
                </div>  
                <div className='player_but' onClick={this.props.onStop}> 
                     <i className="fa fa-stop fa-3x" aria-hidden="true"></i>
                </div>    
                <div className='player_but'>
                     <i className="fa fa-forward fa-3x" aria-hidden="true"></i>
                </div>            
            </div>
        )
    }
}
