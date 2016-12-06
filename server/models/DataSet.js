import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const DataSetSchema = new Schema({
    name: {
        type: String
    },
    file: {
        type: Object
    },
    createdAt: {
        type: Date
    }
});

const DataSet = mongoose.model('DataSet', DataSetSchema);
