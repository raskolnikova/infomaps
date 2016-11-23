import React, {Component} from 'react';

import './index.less'

export default class Welcome extends Component {
    render() {
        return (
            <div className='welcome'>
                <h1>Добро пожаловать в Infomaps!</h1>
                <h2>Для начала работы выберете один из пунктов меню в верхней панели</h2>
            </div>
        )

    }
  }
