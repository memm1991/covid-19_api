const router = require("express").Router();
var axios = require("axios").default;
const Statistics=require('../models/statistics')

const options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': '039b9fc852msh1a72a12be5c209ep133c2cjsn2fdeadcde22a'
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