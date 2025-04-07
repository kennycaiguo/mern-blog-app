import express from 'express'
import { signup,signin } from '../controllers/auth.controller.js'
//用户注册路由
let router = express.Router()
//用户注册需要使用post方法
router.post("/signup",signup)
router.post("/signin",signin)

export default router