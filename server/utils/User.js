import mongoose from 'mongoose'
import crypto from 'crypto'

import '../models/User'


const User = mongoose.model('User');


export function createUser(data){
  const user = new User({
    email:data.email,
    password:hash(data.password),
    scripts:data.scripts,
    maps:data.maps,
    charts:data.charts,
    
  });
  return user.save();
}

export function listUsers(){
  return User.find({});
}

export function getUser(id){
    return User.findOne(id);
}

export function checkUser(data){
    return User
    .findOne({email:data.email})
    .then(function(doc){
        if(doc.password == hash(data.password)){
            console.log('Ok user password');
            return Promise.resolve(doc)
        } else {
            return Promise.reject('Error in User login')
        }
    })
}

function hash(text){
    return crypto.createHash('sha1').update(text).digest('base64')
}



