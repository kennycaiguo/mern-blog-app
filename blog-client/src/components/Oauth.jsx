import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Oauth() {
    let auth = getAuth(app)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let handleGoogleClick =async ()=>{
       let provider = new GoogleAuthProvider()
       provider.setCustomParameters({prompt:'select_account'})
       try {
          let resultFromGoogle = await signInWithPopup(auth,provider)
        //   console.log(resultFromGoogle);
          let res = await fetch('/api/auth/google',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:resultFromGoogle.user.displayName,
                email:resultFromGoogle.user.email,
                googlePhotoUrl:resultFromGoogle.user.photoURL
            })
          })
          let data = await res.json()
          if(res.ok){
            dispatch(signInSuccess(data))
            // 跳转到首页
            navigate('/')
          }
       } catch (error) {
          console.log(error);
       }
    }

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue With Google
        </Button>
    )
}
