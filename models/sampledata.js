const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    blood_pressure: { type: Number },
    age: { type: Number },
    weight: { type: Number }
});

const SampleData = mongoose.model('SampleData', sampleSchema);

exports.SampleData = SampleData;