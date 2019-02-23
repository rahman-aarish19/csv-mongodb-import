const fs = require('fs');
const csv = require('fast-csv');
const { DiabeticDataset } = require('../models/diabetic_dataset');

function readCSVFile(filePath) {
    let dataset = [];

    const stream = fs.createReadStream(filePath);

    const csvStream = csv().on('data', function (data) {
        dataset.push({
            noOfPregnancies: parseInt(data[0]),
            glucose: parseInt(data[1]),
            bloodPressure: parseInt(data[2]),
            skinThickness: parseInt(data[3]),
            insulinLevel: parseInt(data[4]),
            bodyMassRatio: parseFloat(data[5]),
            diabetesPedigreeFunction: parseFloat(data[6]),
            age: parseInt(data[7]),
            result: parseInt(data[8])
        });
    }).on('end', function () {
        dataset.shift();

        DiabeticDataset.insertMany(dataset, function (error, documents) {
            if (error) throw error;
        });

        console.log(`${dataset.length} records have been imported successfully...`);

        fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log('file deleted successfully...');
        });
    });

    stream.pipe(csvStream);
}

exports.readCSVFile = readCSVFile;