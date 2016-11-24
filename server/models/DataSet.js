import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const DataSetSchema = new Schema({
    name: {
        type: String
    },
    file: {
        type: String,
        get: function(data) {
            return JSON.parse(data);
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    },
    createdAt: {
        type: Date
    }
});

const DataSet = mongoose.model('DataSet', DataSetSchema);
