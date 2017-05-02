import React, {Component} from 'react';
import {Form, FormField,FormInput,Button,InputGroup,FormIconField} from 'elemental'
import {Link} from 'react-router'


import UserActions from '../../action/UserAction'
import UserStore from './../../stores/UserStore'


import './index.less'

function getStateFromFlux() {
  return {isExistUser: UserStore.getAnswerFromServer()};
}

export default class Registration extends Component {

    constructor(){
        super();
        this.state={
        email:"",
        password:"",
        isExistUser:false
    }
             this._onChange = this._onChange.bind(this)
    }

   

    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }

    handleAddUser() {
        UserActions.createUser(this.state);
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
            <FormField label="Введите email" htmlFor="horizontal-form-input-email">
            <FormIconField width="one-half" iconPosition="left" iconColor={this.state.isExistUser?"danger":"default"} iconKey={this.state.isExistUser?"stop":"mail"}>
                <FormInput type="email"  name="icon-alignment-left" onChange={(e) => this.handleAddEmail(e.target.value)} />
		</FormIconField>
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

     _onChange() {
        this.setState(getStateFromFlux())
    }
}
