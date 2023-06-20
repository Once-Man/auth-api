const express = require('express');
const mongoose = require('mongoose');

const db = require('./db').DB_URL;

const app = express();

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then( ()=> console.log('DB is connected...')).catch(error => console.log(error));

const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/users/', authRoutes);
app.use('/api/posts/', postRoutes);

app.listen(PORT, () => {
    console.log('Server is running...');
});