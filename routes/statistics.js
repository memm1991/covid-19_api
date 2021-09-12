const router = require("express").Router();
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

})

module.exports=router