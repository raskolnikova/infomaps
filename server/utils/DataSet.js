import mongoose from 'mongoose'

import '../models/DataSet'

const DataSet = mongoose.model('DataSet');

//для наборов данных

export function listDataSet(){
  return DataSet.find();
}

export function createDataSet(data){
  const dataSet = new DataSet({
    name: data.name,
    file:data.file,
    createdAt:data.createdAt
  });
  return dataSet.save();
}

export function deleteDataSet(id){
  return DataSet.findById(id).remove();
}
