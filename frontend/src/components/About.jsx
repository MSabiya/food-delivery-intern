import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const About = () => {
  return (
    <>
    <Navbar/>
     <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
            * {
                font-family: 'Poppins', sans-serif;
            }
        `}</style>
        <h1 className="text-3xl font-semibold text-center mx-auto mt-20" >About our apps</h1>
        <p className="text-sm text-slate-500 text-left mt-2 max-w-md mx-auto mt-5 ">
            At ZaykaMart, we believe great food starts with great ingredients.
We bring you a wide variety of farm-fresh fruits and vegetables, baked goods straight from the oven, and premium snacks & beverages — all carefully sourced for taste and quality.
        </p>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10 mt-5">
            <img className="max-w-sm w-full rounded-xl h-130 "
                src="/images/About.jpeg"
                alt="" />
            <div>
                <h1 className="text-3xl font-semibold " >Why Shop With Us</h1>
                <p className="text-sm text-slate-500 mt-2">
                 Freshness, flavor, and convenience in every order.
                </p>
        
                <div className="flex flex-col gap-10 mt-6 mb-50">
                    <div className="flex items-center gap-4 ">
                        <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-slate-600 ">🥗 Fresh & Natural</h3>
                            <p className="text-sm text-slate-500">Sourced directly from farms to your table for unbeatable freshness.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-slate-600">🛒 Wide Variety</h3>
                            <p className="text-sm text-slate-500">
From everyday staples to exotic finds, we’ve got you covered.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-slate-600">💰 Affordable Pricing</h3>
                            <p className="text-sm text-slate-500">Quality groceries at prices that make sense.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <Footer/>
    </>
   
  )
}

export default About