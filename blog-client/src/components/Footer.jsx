import React from 'react'
import { Footer, FooterLinkGroup } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsTiktok,BsInstagram,BsGithub ,BsDribbble} from 'react-icons/bs'


export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                {/* logo */}
                <div className="mt-5 ">
                    <Link to='/' className='self-center whitespace-nowrap text-lg
                        sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                            via-purple-500 to-pink-500 rounded-lg text-white'>Kenny's</span>
                            Blog
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                  <div>
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                                href='https://www.100jsprojects.com'
                                target='_blank'
                                rel='noopener noreferrer'
                        >
                            100 Js Projects
                        </Footer.Link>
                        <Footer.Link 
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                        >
                           Kenny's Blog
                        </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title='Follow Us' />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                                href='https://github.com/kennycaiguo/'
                                target='_blank'
                                rel='noopener noreferrer'
                        >
                            Github
                        </Footer.Link>
                        <Footer.Link 
                                href='https://vercel.com/guohuas-projects-3d61f7e1'
                                target='_blank'
                                rel='noopener noreferrer'
                        >
                           Vercel
                        </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title='Legal' />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                                href='#'
                                target='_blank'
                                rel='noopener noreferrer'
                        >
                            Privicy Policy
                        </Footer.Link>
                        <Footer.Link 
                                href='#'
                                target='_blank'
                                rel='noopener noreferrer'
                        >
                           Terms & Conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                   
                </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                {/* 版权信息 */}
                <Footer.Copyright href='#' by="Kenny's Blog" year={new Date().getFullYear()}/>
            </div>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                {/* 社交媒体链接信息 */}
                <Footer.Icon href='https://www.facebook.com/guo.kenny.7' icon={BsFacebook}/>
                <Footer.Icon href='https://www.tiktok.com/en/' icon={BsTiktok }/>
                <Footer.Icon href='https://www.instagram.com/kenny887/' icon={BsInstagram}/>
                <Footer.Icon href='https://github.com/kennycaiguo/' icon={BsGithub}/>
                <Footer.Icon href='https://dribbble.com/kenny887' icon={BsDribbble}/>
            </div>
        </div>
    </Footer>
  )
}
