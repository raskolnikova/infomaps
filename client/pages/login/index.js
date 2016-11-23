import React, {Component} from 'react';

import './index.less'

export default class Login extends Component {

    render() {
          return (
          <div>
<div>Введите логин</div>
<input type="text" size="40"/>

<div>Введите пароль</div>
<input type="text" size="40"/>

          </div>
        )
    }
}
