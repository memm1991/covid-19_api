const mongoose = require("mongoose");

const StatisticSchema = mongoose.Schema(
    {
        continent:{type:String},
        country:{type:String},
        population:{type:Number},
        cases:{type:Map},
        deaths:{type:Map},
        tests:{type:Map},
        day:{type:String},
        time:{type:String}
    }
)

module.exports = mongoose.model("Statistics", StatisticSchema);

