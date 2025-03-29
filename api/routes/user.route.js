import express from 'express'
import {test}  from '../controllers/user.controller.js'


let router = express.Router()

router.get("/test",test)

 export default router