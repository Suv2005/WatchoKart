const mongoose= require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginForm")

.then(()=>{
    console.log("mongoose connected")
})

.catch(()=>{
    console.log("not yet connected")
})

const logInSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const logincollection= new mongoose.model('logincollection',logInSchema)

module.exports=logincollection