import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Contact = () => {
  return (
   <>
   <Navbar/>
   <form className="flex flex-col items-center text-sm mt-20">
            <p className="text-lg text-blue-600 font-medium pb-2">Contact Us</p>
            <h1 className="text-4xl font-semibold text-slate-900 pb-4">Get in touch with us</h1>
            <p className="text-sm text-gray-800 text-center pb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />Lorem Ipsum has been the industry's standard dummy text.</p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                <div className="w-full">
                    <label className="text-black/90" htmlFor="name">Your Name</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-900/70 rounded outline-none focus:border-indigo-500" type="text" required />
                </div>
                <div className="w-full">
                    <label className="text-black/90" htmlFor="name">Your Email</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-900/70 rounded outline-none focus:border-indigo-500" type="email" required />
                </div>
            </div>
        
            <div className="mt-6 w-[350px] md:w-[700px]">
                <label className="text-black/90" htmlFor="name">Message</label>
                <textarea className="w-full mt-2 p-2 h-40 border border-gray-900/70 rounded resize-none outline-none focus:border-indigo-500" required></textarea>
            </div>
        
            <button type="submit" className="mt-5 bg-indigo-700 text-white h-12 w-56 px-4 rounded active:scale-95 transition mb-10">Send Message</button>
        </form>
        <Footer/>
   </>
  )
}

export default Contact