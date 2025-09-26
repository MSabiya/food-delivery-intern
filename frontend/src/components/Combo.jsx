import React from 'react'

const Combo = () => {
  return (
    <>
    <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
            * {
                font-family: 'Poppins', sans-serif;
            }
        `}</style>
        <h1 className="text-3xl font-semibold text-center mx-auto">Our Combo</h1>
        <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">A visual collection of our most recent works - each piece crafted with intention, emotion, and style.</p>
        <div className="flex items-center gap-2 h-[400px] w-full max-w-7xl mt-10 mx-auto mb-10">
            <div className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center "
                    src="/images/c8.jpeg"
                    alt="image" />
            </div>
            <div className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center"
                    src="/images/c7.jpeg"
                    alt="image" />
            </div>
            <div className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center"
                    src="/images/c6.jpeg"
                    alt="image" />
            </div>
            <div className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center"
                    src="/images/c5.jpeg"
                    alt="image" />
            </div>
            <div className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center"
                    src="/images/c4.jpeg"
                    alt="image" />
            </div>
            <div className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center"
                    src="/images/c3.jpeg"
                    alt="image" />
            </div>
        </div>





    {/* about */}



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
    </>
  )
}

export default Combo