const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')
const authRoute = require("./routes/auth");
const verify = require('./middlewareToken')
const syncRoute=require('./routes/sync')
const statisticsRoute=require('./routes/statistics')
const morgan = require('morgan');
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connection Successfull"))
.catch((err) => {
  console.error(err);
});
    

app.use(express.json())
app.use(cors())
app.use(morgan('dev'));

app.use('/auth',authRoute)
app.use('/sync', syncRoute)
app.use('/statistics', statisticsRoute)

app.listen(3001,()=>{
    console.log('App Listening at 3001')
})
