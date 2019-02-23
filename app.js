const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const { upload } = require('./helpers/upload');
const { readCSVFile } = require('./helpers/readFile');
const { DiabeticDataset } = require('./models/diabetic_dataset');

mongoose.connect('mongodb://localhost:27017/sample-data', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB server...'))
    .catch((err) => console.log(err));

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Public Folder
app.use(express.static('./public'));

app.get('/', async (req, res) => {
    const dataset = await DiabeticDataset.find();

    if (dataset.length > 0) {
        res.render('index', {
            dataset: dataset
        });
    }
});

app.post('/upload', async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                message: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    message: 'No File Selected!'
                });
            } else {
                readCSVFile(req.file.path);
            }
        }
    });
});

const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Server started on port : ${port}`));