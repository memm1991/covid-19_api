const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const Statistics = require('../models/statistics')



router.get('/',async(req,res)=>{
    try {
        const data = await Statistics.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }


})

router.get('/:countryId',async(req,res)=>{
    try {
        const country = await Statistics.findById(req.params.countryId)
        res.status(200).json(country)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
    
})

router.post('/',async(req,res)=>{
    try {
        const countryObject= await Statistics.findOne({country:req.body.country})
        //here we calculate the total cases by adding new cases
        let casesTotal;
        let deathsTotal;
        if(!countryObject.cases.total){
             casesTotal= 0 + req.body.cases.new
        }
        else{
             casesTotal=countryObject.cases.total + req.body.cases.new
        }
        //here we calculate the total deaths by adding new deaths
        if(!countryObject.deaths.total){
             deathsTotal= countryObject.deaths.total+ req.body.deaths.new
        }
        else{
            countryObject.cases.total + req.body.deaths.new
        }
        
        const{country,...info}=req.body
        const updateData={...info,
            cases:{...info.cases,
                total:casesTotal

        },deaths:{
            ...info.deaths,
            total:deathsTotal
        }
    }
    const response=await Statistics.findByIdAndUpdate(
        countryObject._id,
        {
          $set: updateData,
        },
        { new: true }
      );
  res.status(200).json(response)
} catch (error) {
    console.log(error)
}
})

module.exports=router
        
        

