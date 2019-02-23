const fs = require('fs');
const csv = require('fast-csv');
const { SampleData } = require('../models/sampledata');

function readCSVFile(filePath) {
    let sampleData = [];

    const stream = fs.createReadStream(filePath);

    const csvStream = csv().on('data', function (data) {
        sampleData.push({ blood_pressure: parseFloat(data[0]), age: parseInt(data[1]), weight: parseInt(data[2]) });
    }).on('end', function () {
        sampleData.shift();

        SampleData.insertMany(sampleData, function (error, documents) {
            if (error) throw error;
        });

        console.log(`${sampleData.length} records have been imported successfully...`);
        fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log('file deleted successfully...');
        });
    });

    stream.pipe(csvStream);
}

exports.readCSVFile = readCSVFile;