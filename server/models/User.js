import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
     email: {
        type: String,
         unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     scripts: [{
        type: Schema.Types.ObjectId,
        ref: 'Script'
    }],
     charts: [{
        type: Schema.Types.ObjectId,
        ref: 'Chart'
    }],
     maps: [{
        type: Schema.Types.ObjectId,
        ref: 'Map'
    }],

});

const User = mongoose.model('User', UserSchema);