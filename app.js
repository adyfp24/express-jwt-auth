const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoutes');
const meRoute = require('./routes/meRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api',authRoute);
app.use('/api',meRoute);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

