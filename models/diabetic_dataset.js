const mongoose = require('mongoose');

const diabeticSchema = new mongoose.Schema({
    noOfPregnancies: {
        type: Number,
        required: true
    },
    glucose: {
        type: Number,
        required: true
    },
    bloodPressure: {
        type: Number,
        required: true
    },
    skinThickness: {
        type: Number,
        required: true
    },
    insulinLevel: {
        type: Number,
        required: true
    },
    bodyMassRatio: {
        type: Number,
        required: true
    },
    diabetesPedigreeFunction: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
});

const DiabeticDataset = mongoose.model('DiabeticDataset', diabeticSchema);

exports.DiabeticDataset = DiabeticDataset;