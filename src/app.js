const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');



const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const blogRoutes = require('../routes/blogRoutes');

app.use('/api/articles', blogRoutes);

app.get('/', (req, res) => {
    res.send('Home Route');
});



module.exports = app;
