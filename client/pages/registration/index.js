import React, {Component} from 'react';
import {Form, FormField,FormInput,Button} from 'elemental'
import {Link} from 'react-router'


import UserActions from '../../action/UserAction'

import './index.less'


export default class Registration extends Component {

    constructor(){
        super();
        this.state={
        username:"",
        email:"",
        password:""
        }
    }

    handleAddUser() {
       UserActions.createUser(this.state);
    }

handleAddUserName(name){
 this.setState({username:name})
}

handleAddEmail(email){
 this.setState({email:email})
}

handleAddPassword(password){
 this.setState({password:password})
}


    render() {
          return (
              <div className="form-container ">
          <Form type="horizontal" className='form-login border'>
          <h2>Infomaps</h2>
            <FormField label="Введите логин" htmlFor="horizontal-form-input-email">
                 <FormInput  name="username" onChange={(e) => this.handleAddUserName(e.target.value)}/>
            </FormField>
            <FormField label="Введите email" htmlFor="horizontal-form-input-email">
                <FormInput type="email"  name="email" onChange={(e) => this.handleAddEmail(e.target.value)} />
            </FormField>
            <FormField label="Введите пароль" htmlFor="horizontal-form-input-password">
                <FormInput type="password"  name="password" onChange={(e) => this.handleAddPassword(e.target.value)} />
            </FormField>
            <FormField offsetAbsentLabel>
            <div className='actions'>   
                <Button onClick= {() => this.handleAddUser()}>Зарегистрироваться</Button>
                <Link to='/login'>
                    <div  className='inscription registration'>Войти</div>
                </Link>
            </div>
            </FormField>
</Form>     
</div>
        )
    }
}
