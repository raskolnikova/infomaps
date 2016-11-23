import mongoose from 'mongoose'

import config from '../../etc/config.json'

import '../models/DataSet'

const DataSet = mongoose.model('DataSet');

//создает соединение
export function setUpConnection(){
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}


//для наборов данных

export function listDataSet(){
  return DataSet.find();
  console.log('список')

}

export function createDataSet(data){
  const dataSet = new DataSet({
    name: data.name,
    createdAt:new Date()
  });
  console.log('принял')
  return dataSet.save();
}

export function deleteDataSet(id){
  return DataSet.findById(id).remove();
}
