const express = require('express');
const indexRouter = require('./routes/index');
const catsRouter = require('./routes/cats');

const app = express();
const port = process.env.port || 3000;

// CORS Middleware
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/', indexRouter);
app.use('/cats', catsRouter);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
})