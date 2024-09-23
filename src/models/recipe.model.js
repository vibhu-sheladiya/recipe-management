const mongoose=require('mongoose');
const recipeSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            // required:[true,'Please enter the name of your product']
        },

        ingredients:{type : String},

       desc:{type : String},
       
        cuisine_type:{type : Array},
   
        author:{type : String},
    userid: 
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
       },
     
        },
        {timestamps: true},{collection:''}
);
const Recipe=mongoose.model("recipe",recipeSchema);
module.exports= Recipe;