import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const DataSetSchema = new Schema({
  name:{type:String},
  createdAt: {type:Date}
});

const DataSet = mongoose.model('DataSet',DataSetSchema);
