const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const expenseRouter = require("./routes/expense_routes");
const port = process.env.PORT || 5000;
const apikey = process.env.API_KEY;
const bodyParser = require('body-parser');

app.use(cors());
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. 
app.use(express.json());

const uri = `mongodb+srv://user:${apikey}@cluster0.lenqf.mongodb.net/expenseSharing?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/', expenseRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});