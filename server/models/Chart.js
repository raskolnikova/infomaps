import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ChartSchema = new Schema({
    name: {
        type: String
    },
    file: {
        type: Object
    },
    type: {
        type: String
    },
    createdAt: {
        type: Date
    },
    visibleColumns:[String]
});

const Chart = mongoose.model('Chart', ChartSchema);
