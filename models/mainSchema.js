const mongoose = require('mongoose')

const mainSchema = new Schema({
    email : {
        required: true,
        type: String,
    }
})

module.exports = mongoose.model('mainModel',mainSchema)