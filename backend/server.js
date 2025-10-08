const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/review',require('./routes/Screenshot'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch(err => console.log(err));


app.get('/',(req,res) => {
    res.send('app is running.');
});



app.listen(PORT,() => {
    console.log(`ya ya i'm Backend and i'am listening from the ${PORT}😊👍`);
});