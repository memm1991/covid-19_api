const router = require("express").Router();
var axios = require("axios").default;
const Statistics=require('../models/statistics')

const options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': process.env.KEY_VALUE
    }
  };
 


router.get('/',async(req,res)=>{
    try {
      // get any document if exist then we need to update, else we populate de collection
        const doc= await Statistics.findOne()
        const response= await axios.request(options)
        if(!doc){
          await Statistics.insertMany(response.data.response)
          return res.send('documents created')
        }
        else{
          await Statistics.updateMany({$set:response.data.response})
          res.send('document updated')
        }
      } catch (error) {
          console.log(error)
      }
  })





module.exports = router;