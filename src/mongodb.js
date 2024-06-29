const mongoose = require("mongoose")
const mongoURI = 'mongodb://localhost:27017/DietWebsite';


mongoose.connect("mongodb://localhost:27017/DietWebsite")
.then(()=>{
    console.log("mongodb connected");
})
.catch(err =>{
    console.log("failed to connect", err);
})

const LogInSchema= mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    }
})

const collection = mongoose.model("Collection1",LogInSchema)

module.exports=collection