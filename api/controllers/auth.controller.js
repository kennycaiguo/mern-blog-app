import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

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

//登录函数
export const signin = async (req,res,next) =>{
    //先验证用户名密码是否正确，
    let {email,password} = req.body 
    //过滤email和空密码
    if(!email || !password || email===''  || password===''){
         next(errorHandler(400,"All Fields Are Required")) 
    }

    try {
        let validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404,'User Not Found'))
        }

        let validPass = bcryptjs.compareSync(password,validUser.password)
        if(!validPass){
           //这个return不能少，否则密码不正确也能够登录成功
           return next(errorHandler(400,'Invalid Password'))
        }
       //颁发token,你可以设置过期时间，不过这里为了测试方便，我们就不设置了
       let token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
       //把密码和其他字段分开
       let {password:pass,...rest} = validUser._doc
       //设置到cookie
       res.status(200).cookie("access_token",token,{
          httpOnly:true}).json(rest) //使用没有密码的信息
    
    } catch (error) {
        next(error)
    }
}

//google验证函数,可以登录或者创建新用户
export const google = async (req,res,next)=>{
  //获取前端传递过来的选项
  let {email,name,googlePhotoUrl} = req.body
  try {
    let user = await User.findOne({email})
    //判断用户是否存在，如果存在就登录，不存在就注册
    if(user){
        let token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        let {password,...rest} = user._doc
        //设置到cookie
       res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest) //使用没有密码的信息
    } else {
        let generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        let hashedPassword = bcryptjs.hashSync(generatedPassword,10)
        //创建用户
        let newUser = new User({
            username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
            email,
            password:hashedPassword,
            profilePicture:googlePhotoUrl
        })
        //保存用户信息
        await newUser.save()
        //创建token
        let token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        let {password,...rest} = newUser._doc
        //设置到cookie
       res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest) //使用没有密码的信息
    }
  } catch (error) {
    next(error)
  }
}