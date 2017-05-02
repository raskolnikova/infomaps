import React, {Component} from 'react';
import {Form, FormField,FormInput,Button} from 'elemental'
import {Link} from 'react-router'

import UserActions from '../../action/UserAction'

import './index.less'


export default class Login extends Component {

    constructor(){
        super();
        this.state={
        username:"",
        password:""
        }
    }

    handleCheckUser() {
// e.preventDefault()
    const value = this.state.username
    window.localStorage.setItem('rr_login', value)
       //UserActions.checkUser(this.state);
    }

handleAddUserName(name){
 this.setState({username:name})
}

handleAddPassword(password){
 this.setState({password:password})
}

    render() {
          return (
              <div className="form-container ">
          <Form type="horizontal" className='form-login border' >
          <h2>Infomaps</h2>
            <FormField label="Введите логин или email" htmlFor="horizontal-form-input-email">
                <FormInput type="email"  name="email" onChange={(e) => this.handleAddUserName(e.target.value)} />
            </FormField>
            <FormField label="Введите пароль" htmlFor="horizontal-form-input-password">
                <FormInput type="password"  name="password" onChange={(e) => this.handleAddPassword(e.target.value)} />
            </FormField>
            <FormField offsetAbsentLabel>
            <div className='actions'>
             <Link to='/scripts'>
                <Button onClick= {() => this.handleCheckUser()}>Войти</Button>
            </Link>
                 <Link to='/registration'>
                    <div  className='inscription registration'>Регистрация</div>
                </Link>
             </div>
            </FormField>
</Form>     
</div>
        )
    }
}
