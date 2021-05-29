const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

var string = '';
app.use(cors());
app.use(express.json({limit: '1mb'}));

app.get('/', (req, res) => {
    res.send("API is working properly");
});
app.post('/api', (request, response) => {
    console.log("request received!")
    const data = request.body;
    // console.log(data.x);
    response.json({
        status: 'success',
        instructions: data.x,
    });
    string = data.x;
    console.log(string);
});

app.get('/api/answer', (req, res) => {
    console.log("Getting Data!");
    console.log(string);
    res.send(string);
});
app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
