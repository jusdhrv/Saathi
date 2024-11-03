const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const env = new nunjucks.Environment();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/logs.log'), { flags: 'a' })
app.use(morgan("[:date[web]]    :    :method  |  ':url'  |   HTTP/:http-version   |  Code :status  |  :response-time ms", { stream: accessLogStream }))
app.use(express.json())
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    data = {}
    res.render('home.html', data);
});

const port = 3000
app.listen(port, () => console.log(`This app is listening on port ${port}`));