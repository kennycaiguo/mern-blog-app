import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"

//注意：这里需要一个异步函数
export const signup = async (req,res,next) =>{
    //  console.log(req.body);
    let {username,email,password} = req.body 
    //过滤空用户名空email和空密码
    if(!username || !email || !password || username==='' || email==='' || password===''){
        // return res.status(400).json({message:"All Fields Are Required"})
         next(errorHandler(400,"All Fields Are Required")) 
    }
    //对密码进行哈希处理
    let hashedPassword = bcryptjs.hashSync(password,10) 
    
    //验证后保存用户信息
    let newUser = new User({
        username,
        email,
        password:hashedPassword
    })
    try {
        await newUser.save()
        res.status(200).json("user created successfully")
    } catch (error) {
        // res.status(500).json({message:error.message}) //注意，这里的status代码必须是500.否则即使用户名相同，它也不报错
        next(error)
    }
}