const mongoose = require('mongoose');
const {Schema} = mongoose

const studentSchema = new Schema({
    name: { type: String, required: true },
    studentID: { type: String, required: true },
    email: { type: String, required: true },
    trimester: { type: Number, required: true },
}, { timestamps: true });
module.exports = mongoose.model('student', studentSchema);