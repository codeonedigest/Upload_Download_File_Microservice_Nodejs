const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./fileroute');

const app = express();

app.use(bodyParser.json());

global.__basedir = __dirname;
app.use('/api/v1', fileRoutes);

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({
      message: 'The requested URL could not be found.',
      statusCode: 404,
    });
  });
  
app.use((error, req, res, next) => {
    const { message } = customResourceResponse.serverError;
    const data = {
    Code: `${error.code ? error.code : ''}`,
    Stacktrace: `${error.stack}`
    };
    res.status(500).json({ message, data });
});


const port = 8081;

app.listen(port, () => console.log('File server started and listening on port ' + port));



