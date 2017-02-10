import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: {
        type: String
    },
    dataFile: {
        type: Object
    },
    type: {
        type: String
    },
    colorSchema:{
        type: [String]
    },
    createdAt: {
        type: Date
    },
    visibleColumns:[String]
});

const Map = mongoose.model('Map', MapSchema);
