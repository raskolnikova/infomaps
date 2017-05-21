import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: {
        type: String
    },
    data: {
        type: Object
    },
    type: {
        type: String
    },
    colorSchema:{
        type: [Number]
    },
    createdAt: {
        type: Date
    },
    visibleColumns:[String],
    domen:[Number],
     ISO3Column: {
        type: String
    },
});

const Map = mongoose.model('Map', MapSchema);
