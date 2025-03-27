import mongoose from "mongoose";

//创建schema
let userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

},
{
    timestamps:true
}
)

//利用上面的schema创建用户模型
let User = mongoose.model('User',userSchema)

//把创建好的用户模型导出
export default User