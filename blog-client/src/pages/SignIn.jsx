import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
// import store from '../redux/store'

export default function SignIn() {
   let [formData,setFormData] = useState({})
  //  let [errorMessage,setErrorMessage] = useState(null)
  //  let [loading,setLoading] = useState(false)
  let {loading,error:errorMessage }= useSelector(state=>state.user)
   //初始化一个dispatch对象，然后用它来调用我们的函数
   let dispatch = useDispatch()
   let navigate = useNavigate()
   let handleChange = (e)=>{
      //  console.log(e.target.value);
       setFormData({...formData,[e.target.id]:e.target.value.trim()})
   }
  //  console.log(formData);
   let handleSubmit =async (e)=>{
      e.preventDefault() //阻止默认行为
      //表单数据验证,返回错误信息
      if(!formData.email || !formData.password){
        //  return setErrorMessage('Please Fill Out All Fields!')
        return dispatch(signInFailure("Please Fill In All Fields!"))
      }
      try {
        // setLoading(true)
        // setErrorMessage(null) //清空之前的错误信息
        dispatch(signInStart()) //这个函数里面就是做了上面2步
        let res =await fetch("/api/auth/signin",{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formData)
        })
        //处理获取到的数据
        let data = await res.json()
        console.log("data:",data);
        
        // 处理其他错误
        if(data.success === false){
          // return setErrorMessage(data.message)
          dispatch(signInFailure(data.message))
        }
        // setLoading(false)
        //如果注册成功，就跳转到登录页面
        if(res.ok){
          dispatch(signInSuccess(data))
          // console.log(data);
          
          navigate("/") //登录后跳转到首页
        }
      } catch (error) {
        // setErrorMessage(error.message)
        // setLoading(false) //捕获到错误后，也需要把loading设置为false
        dispatch(signInFailure(error.message))
      }
   }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
                   <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                   via-purple-500 to-pink-500 rounded-lg text-white'>Kenny's</span>
                   Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            {/* <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
            </div> */}
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
              {loading? (
                <>
                 <Spinner size='sm' />
                 <span className='pl-3'>Loading...</span>
                </>
                 
              ) : 'Sign In'}
            </Button>
          </form>
           <div className='flex gap-2 text-sm mt-5'>
              <span>Don't Have An Account?</span>
              <Link to='/sign-up' className='text-blue-500'>
                Sign Up
              </Link>
           </div>
           {
             errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
             )
           }
        </div>

      </div>
    </div>
  )
}

