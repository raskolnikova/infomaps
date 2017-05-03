import React, {Component} from 'react';
import {Form, FormField,FormInput,Button,InputGroup,FormIconField, Alert} from 'elemental'
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
        isExistUser:false,
        isNotValidEmail:false,
        isNotValidPassword:false
        
    }
             this._onChange = this._onChange.bind(this)
    }

   

    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }

    handleAddUser() {
        if(this.validateEmail(this.state.email) && this.validatePassword(this.state.password)){
             this.setState({isNotValidEmail:false,isNotValidPassword:false })
             const user = {email:this.state.email,password:this.state.password,scripts:[],maps:[],charts:[]}
             UserActions.createUser(user);
        }
             else {
                if(!this.validateEmail(this.state.email)) 
                    this.setState({isNotValidEmail:true})
                    else this.setState({isNotValidEmail:false})
                if(!this.validatePassword(this.state.password)) 
                    this.setState({isNotValidPassword:true})
                    else this.setState({isNotValidPassword:false})
                    
             }
    }

validateEmail(email) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(reg.test(email) == false) 
      return false
    else return true 
}

validatePassword(password){
    if(password.length<8)
    return false
    else return true
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
            <FormIconField width="one-half" iconPosition="left" iconColor={this.state.isExistUser||this.state.isNotValidEmail?"danger":"default"} iconKey={this.state.isExistUser?"stop":"mail"}>
                <FormInput type="email"  name="icon-alignment-left" onChange={(e) => this.handleAddEmail(e.target.value)} />
		</FormIconField>
            </FormField>
           { (this.state.isExistUser)?
                 <Alert type="danger">Пользователь с таким email уже существует</Alert>
                 : (this.state.isNotValidEmail)?
                <Alert type="danger">Неверный email адресс</Alert> :
                null       
           }
            <FormField label="Введите пароль" htmlFor="horizontal-form-input-password">
             <FormIconField width="one-half" iconPosition="left" iconColor={this.state.isNotValidPassword?"danger":"default"} iconKey={this.state.isExistUser?"stop":"key"}>
                <FormInput type="password"  name="password icon-alignment-left" onChange={(e) => this.handleAddPassword(e.target.value)} />
		</FormIconField>
            </FormField>
              { (this.state.isNotValidPassword)?
                 <Alert type="danger">В пароле должно быть не менее 8 символов</Alert>
                 : null       
           }
            
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
