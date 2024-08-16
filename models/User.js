import { Schema, model } from "mongoose";

const userSchema = new Schema({
    Name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    Age : {
        type : Number,
        require : true
    },
    Address : {
        type : String,
        require : true
    }
},{
    timestamps : true
})


const User = model("User", userSchema)

export default User