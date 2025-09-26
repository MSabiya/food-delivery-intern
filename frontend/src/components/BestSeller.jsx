import React from 'react'

const BestSeller = () => {
  return (
   <>
   <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
            * {
                font-family: 'Poppins', sans-serif;
            }
        `}</style>
        <h1 className="text-3xl font-semibold text-center mx-auto mt-10 ">Best Sellers</h1>
        <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">A visual collection of our most recent works - each piece crafted with intention, emotion, and style.</p>
        <div className="flex flex-wrap items-center justify-center mt-10 mx-auto gap-4 mb-15">
            <img className="max-w-56 h-80 object-cover rounded-lg hover:-translate-y-1 transition-all duration-300" src="/images/combo2.jpeg" alt="image" />
            <img className="max-w-56 h-80 object-cover rounded-lg hover:-translate-y-1 transition-all duration-300" src="/images/c3.jpeg" alt="image" />
            <img className="max-w-56 h-80 object-cover rounded-lg hover:-translate-y-1 transition-all duration-300" src="/images/banner5.jpg" alt="image" />
            <img className="max-w-56 h-80 object-cover rounded-lg hover:-translate-y-1 transition-all duration-300" src="/images/ChickenFriedRice.jpeg" alt="image" />
            <img className="max-w-56 h-80 object-cover rounded-lg hover:-translate-y-1 transition-all duration-300" src="/images/Parotta.jpeg" alt="image" />
        </div>
   </>
  )
}

export default BestSeller