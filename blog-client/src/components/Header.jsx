import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { FcSearch } from "react-icons/fc";
import {FaMoon} from 'react-icons/fa'
import { HiMail } from "react-icons/hi";

export default function Header() {
  let path = useLocation().pathname
  return (
     <Navbar className='border-b-2'>
       <Link to='/' className='self-center whitespace-nowrap text-sm
        sm:text-xl font-semibold dark:text-white'>
         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
         via-purple-500 to-pink-500 rounded-lg text-white'>Kenny's</span>
         Blog
       </Link>
       
       <form>
         <TextInput type='text' placeholder='Search..' 
             rightIcon={AiOutlineSearch} className='hidden lg:inline' />
       </form>
       <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
       </Button>
       {/* 在一个div组件里面包裹一个模式按钮和一个被link组件包裹的登录按钮 */}
       <div className='flex gap-2 md:order-2 '>
          <Button className='w=12 h-10 hidden sm:inline ' color='gray' pill>
            <FaMoon />
          </Button>
          <Link to="/signin" >
            <Button  gradientDuoTone="purpleToBlue" outline>
              Sign In 
            </Button>
          </Link>
          <Navbar.Toggle/>
       </div>
       {/* 菜单 */}
        <Navbar.Collapse>
          {/* 激活路由 */}
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to='/about'>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects'>
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
     </Navbar>
  )
}
