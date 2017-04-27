import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ScriptSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    charts:[ {
        type: Schema.Types.ObjectId,
        ref: 'Chart'
    }],
    maps:[ {
        type: Schema.Types.ObjectId,
        ref: 'Map'
    }]
});

const Script = mongoose.model('Script', ScriptSchema);