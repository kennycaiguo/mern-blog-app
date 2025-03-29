import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'

dotenv.config() //读取配置文件
mongoose.connect(process.env.MONGO)
         .then(()=>{
            console.log("MongoDB is connected");
         })
         .catch(err=>{
            console.log(err);
         })
let app = express()
let port = 3000
//开启json中间件
app.use(express.json())
app.listen(port,()=>{
    console.log(`server is running: http://localhost:${port}/ !!!`);
})

//使用我们导入的userRoute
app.use("/api/user",userRoute)
//使用authRoute
app.use("/api/auth",authRoute)